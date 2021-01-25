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
                            const { entities, result } = action.payload.data;

                            state.data[entityName] = { ...state.data[entityName], ...entities[entityName] }
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
        updateRelations: {
            reducer: (state, action) => {
                const { entityName } = action.meta;
                const { entityId, relations, data } = action.payload;
                const entity = state.data[entityName][entityId];

                relations.forEach(relation => {
                    const { key, selfKey, model } = relation;
                    const prev = entity[key], next = data[key];

                    //Update related entities
                    if (selfKey) {
                        const toDetach = relation.many
                            ? prev.filter(id => !next.includes(id)) : prev !== next ? [prev] : []

                        const toAttach = relation.many
                            ? next.filter(id => !prev.includes(id))
                            : prev !== next ? [next].filter(Boolean) : []

                        toDetach.forEach(detach => {
                            const related = state.data[model.name][detach];

                            if (related) {
                                related[selfKey] = relation.selfMany
                                    ? related[selfKey].filter(id => id !== entityId) : null
                            }
                        });

                        toAttach.forEach(attach => {
                            const related = state.data[model.name][attach];

                            related[selfKey] = relation.selfMany
                                ? (related[selfKey] || []).concat([entityId]) : entityId
                        });
                    }

                    //Update status if it is entities tree
                    if (!relation.many && relation.isTree && prev != next) {
                        const root = state.status[entityName].root;

                        if (root) {
                            prev && root.result.push(entityId);
                            next && (root.result = root.result.filter(rId => rId !== entityId))
                        }
                    }

                    //Update entity relations
                    entity[key] = next || null;
                });
            },
            prepare: (entityName, entityId, data) => {
                const model = Model.findModel(entityName);
                const relations = model.getRelations();

                return { meta: { entityName }, payload: { entityId, relations, data } }
            },
        },
    },
});

export { reducer, actions }
