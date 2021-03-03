import { createSlice } from '@reduxjs/toolkit';
import { actions as entityActions } from '~s/modules/entity/';
import Model from '~s/modules/entity/Model';

let initialState = { data: {}, status: {} };

Model.getEntityNames().forEach((name) => {
    initialState.data[name] = {
        lastQuery: '',
        viewType: 'table',
        page: null,
        limit: null,
        searchKeyword: '',
        filters: {},
        selected: [],
        processing: false,
        isActive: false,
        isFiltersActive: false,
    };
    initialState.status[name] = {};
});

const commonReducerCreator = (paramName) => ({
    reducer: (state, action) => {
        state.data[action.meta.entityName][paramName] =
            action.payload;
    },
    prepare: (entityName, payload) => ({
        meta: { entityName },
        payload,
    }),
});

const { actions, reducer } = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setActive: commonReducerCreator('isActive'),
        setViewType: commonReducerCreator('viewType'),
        setSearch: commonReducerCreator('searchKeyword'),
        setFilters: commonReducerCreator('filters'),
        setSelected: commonReducerCreator('selected'),
        setQuery: commonReducerCreator('lastQuery'),
        setProcessing: commonReducerCreator('processing'),
        setPage: commonReducerCreator('page'),
        setLimit: commonReducerCreator('limit'),
        setStatus: {
            reducer: (state, action) => {
                state.status[action.meta.entityName] = action.payload;
            },
            prepare: (entityName, payload) => ({
                meta: { entityName },
                payload,
            }),
        },
    },
    extraReducers: (builder) => {
        builder.addCase(entityActions.apiSuccess, (state, action) => {
            const {
                entityName,
                query,
                isMultiple,
                type,
            } = action.meta;

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
                };
            }
        });
    },
});

export { reducer, actions };
