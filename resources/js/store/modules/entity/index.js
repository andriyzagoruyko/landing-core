import { createSlice } from '@reduxjs/toolkit'
import { normalize } from 'normalizr';
import Model from './Model';
import merge from 'lodash/merge'
import entities from './schema'

let initialState = { data: {}, status: {} };

Model.registerModels(entities).forEach(name => {
    initialState.data[name] = {}
    initialState.status[name] = {}
});

const { actions, reducer } = createSlice({
    name: 'entity',
    initialState,
    reducers: {
        apiSuccess: {
            reducer: (state, action) => {
                const { entityName, query, type } = action.meta;

                state.status[entityName][query] = { isFetching: false, error: null };

                if (action.payload.data) {
                    switch (type) {
                        case 'get': {
                            const { entities, result } = action.payload.data;

                            state.status[entityName][query].result = result;

                            for (let name in entities) {
                                state.data[name] = merge({}, state.data[name], entities[name]);
                            }

                            break;
                        }

                        case 'delete': {

                        }

                        default: {
                            const model = Model.findModel(entityName);

                            console.log(model.getRelations('hasMany'));

                            const { entities, result } = action.payload.data;

                            state.data[entityName] = {
                                ...state.data[entityName], ...entities[entityName]
                            }

                            state.status[entityName][query].result = result;

                            break;
                        }
                    }
                }
            },
            prepare: (entityName, request, result) => {
                const schema = Model.getEntitySchema(entityName, request.isMultiple);
                const data = result && result.data ? normalize(result.data, schema) : null;

                return { meta: { ...request, entityName }, payload: { ...result, data } }
            },
        },
        apiRequest: {
            reducer: (state, action) => {
                const { entityName, query } = action.meta;

                if (!state.status[entityName][query]) {
                    state.status[entityName][query] = {};
                }

                state.status[entityName][query].isFetching = true;
            },
            prepare: (entityName, request) => ({ meta: { entityName, ...request } }),
        },
        apiError: {
            reducer: (state, action) => {
                const { entityName, query } = action.meta;
                const { error } = action;

                state.status[entityName][query] = { isFetching: false, error };
            },
            prepare: (entityName, request, error) => ({ request, error, meta: { entityName } }),
        },
        setStatuses: {
            reducer: (state, action) => {
                state.status[action.meta.entityName] = action.payload
            },
            prepare: (entityName, statuses) => ({ meta: { entityName }, payload: statuses }),
        },
        attach: {
            reducer: (state, action) => {
                const { entityName } = action.meta;
                const { id, newParent } = action.payload;

                const entity = state.data[entityName][id];
                const oldParent = entity.parent_id;
                const root = state.status[entityName].root;

                if (oldParent != newParent) {
                    //detach
                    if (oldParent) {
                        const parent = state.data[entityName][oldParent];

                        if (parent) {
                            parent.children = parent.children.filter(childId => childId !== id);
                        }

                        entity.parent_id = null;
                        
                        root && root.result.push(id);
                    }

                    //attach
                    if (newParent) {
                        const parent = state.data[entityName][newParent];

                        if (parent) {
                            entity.parent_id = newParent;
                            parent.children.push(id);

                            root && (root.result = root.result.filter(rId => rId !== id))
                        }
                    }
                }
            },
            prepare: (entityName, id, newParent = null) => ({ meta: { entityName }, payload: { id, newParent } }),
        }
    },
});

export { reducer, actions }
