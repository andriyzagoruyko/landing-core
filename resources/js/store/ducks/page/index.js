import { createSlice } from '@reduxjs/toolkit'
import { parseQuery } from '~/helpers/query'
import { actions as entityActions } from '~s/ducks/entity/'
import { entities } from '../entities';

const commonReducerCreator = (paramName) => ({
    reducer: (state, action) => {
        state.data[action.meta.entityName][paramName] = action.payload
    },
    prepare: (entityName, payload) => ({ meta: { entityName }, payload }),
});

const pagesSlice = (entities) => {
    let initialState = {
        data: {},
        status: {}
    };

    entities.forEach(name => {
        initialState.data[name] = {
            lastQuery: '',
            viewType: 'table',
            searchKeyword: '',
            filters: {},
            selected: [],
            processing: false,
            isActive: false,
            isFiltersActive: false,
        }
        initialState.status[name] = {}
    });

    return createSlice({
        name: 'page',
        initialState,
        reducers: {
            setActive: commonReducerCreator('isActive',),
            setViewType: commonReducerCreator('viewType'),
            setSearch: commonReducerCreator('searchKeyword'),
            setFilters: commonReducerCreator('filters'),
            setSelected: commonReducerCreator('selected'),
            setQuery: commonReducerCreator('lastQuery'),
            setProcessing: commonReducerCreator('processing',),
            setStatus: {
                reducer: (state, action) => {
                    state.status[action.meta.entityName] = action.payload
                },
                prepare: (entityName, payload) => ({ meta: { entityName }, payload }),
            },
        },
        extraReducers: (builder) => {
            builder.addCase(entityActions.apiSuccess, (state, action) => {
                const { entityName, query, isMultiple, type } = action.meta;

                if (action.payload.maxPages) {
                    state.data[entityName].lastQuery = query;
                }

                if (isMultiple && type === 'get') {
                    if (!state.status[entityName][query]) {
                        state.status[entityName][query] = {};
                    }

                    state.status[entityName][query] = {
                        maxPages: action.payload.maxPages,
                        total: action.payload.total,
                        parsedParams: isMultiple ? parseQuery(query) : {}
                    };
                }
            });
        },
    });
}

const { actions, reducer } = pagesSlice(entities);

export { reducer, actions }