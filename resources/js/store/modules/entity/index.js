import { createSlice } from '@reduxjs/toolkit'
import { normalize } from 'normalizr';
import { getEntitySchema } from '~s/modules/schema';
import { entities } from '../entities';
import merge from 'lodash/merge'

const entitiesSlice = (entities) => {
    let initialState = { data: {}, status: {} };

    entities.forEach(name => {
        initialState.data[name] = {}
        initialState.status[name] = {}
    });

    return createSlice({
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

                            case 'delete': { }

                            default: {
                                state.data[entityName] = {
                                    ...state.data[entityName], ...action.payload.data
                                }

                                break;
                            }
                        }
                    }
                },
                prepare: (entityName, request, result) => {
                    const schema = getEntitySchema(entityName, request.isMultiple);
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
        },
    });
}

const { actions, reducer } = entitiesSlice(entities);

export { reducer, actions }
