import { parseQuery, stringifyQuery } from '~/helpers/query';
import entity from '~s/modules/entity/selectors';
import { createSelector } from 'reselect'

const getPageData = (state, entityName) => (
    state.pages.data[entityName]
);

const isActive = createSelector(
    getPageData, data => data.isActive
);

const getViewType = createSelector(
    getPageData, data => data.viewType
);

const getSelected = createSelector(
    getPageData, data => data.selected
);

const isSelected = createSelector(
    getPageData, data => data.selected.includes(id)
);

const getSearchKeyword = createSelector(
    getPageData, data => data.searchKeyword
);

const isSearchActive = createSelector(
    getSearchKeyword, keyword => keyword.length > 0
);

const getFilters = createSelector(
    getPageData, data => data.filters
);

const getLastQuery = createSelector(
    getPageData, data => data.lastQuery
);

const getProcessing = createSelector(
    getPageData, data => data.processing
);

const getStatus = createSelector(
    (state, entityName, key) => state.pages.status[entityName][key],
    status => status
);

const getPage = createSelector(
    getStatus,
    status => status && status.parsedParams.page
);

const getMaxPages = createSelector(
    getStatus,
    status => status && status.maxPages
);

const getTotal = createSelector(
    getStatus,
    status => status && status.total
);

const getLimit = createSelector(
    getStatus,
    status => status && status.parsedParams.limit
);

const getActivePage = createSelector(
    state => state.pages,
    pages => pages.find(entityName => isActive(state, entityName))
);

const getCurrentQuery = (state) => (
    state.router.location.search.replace('?', '')
);


const getStatusesdWithSameParams = (state, entityName, key) => {
    const status = getStatus(state, entityName, key);
    const statusParams = Object.keys(status.parsedParams);
    const result = {};

    for (let key in state.pages.status[entityName]) {
        const current = getStatus(state, entityName, key);
        const currentParams = Object.keys(current.parsedParams);

        if (currentParams.length === statusParams.length
            && statusParams.every(k => currentParams.includes(k))) {
            result[key] = { ...current };
        }
    }

    return result;
}

const getQueryAndParams = (state, entityName, restoreOnComeback = false, restoreAlways = [], initialParams = {}) => {
    const currentQuery = getCurrentQuery(state);
    const status = entity.getStatus(state, entityName, currentQuery);
    const lastQuery = getLastQuery(state, entityName);
    const savedQuery = status.result ? currentQuery : lastQuery;
    const parsedLastQuery = parseQuery(lastQuery);

    let params = parseQuery(currentQuery);
    let restoredQuery = '';
    let isParamsRestored = false;

    if (restoreOnComeback && !isActive(state, entityName)) {
        for (let key in parsedLastQuery) {
            if (!params[key]) {
                params[key] = parsedLastQuery[key];
                isParamsRestored = true;
            }
        }
    }

    if (Object.keys(initialParams).length) {
        for (let key in initialParams) {
            if (!params[key]) {
                params[key] = restoreAlways.includes(key) && parsedLastQuery[key]
                    ? parsedLastQuery[key]
                    : initialParams[key]

                isParamsRestored = true;
            }
        }
    }

    if (isParamsRestored) {
        restoredQuery = stringifyQuery(params);
    }

    return { params, restoredQuery, savedQuery, currentQuery };
}

export default {
    isActive,
    getViewType,
    getSelected,
    isSelected,
    getSearchKeyword,
    getLastQuery,
    getProcessing,
    isSearchActive,
    getFilters,
    getStatus,
    getPage,
    getMaxPages,
    getTotal,
    getLimit,
    getActivePage,
    getCurrentQuery,
    getStatusesdWithSameParams,
    getQueryAndParams,
}