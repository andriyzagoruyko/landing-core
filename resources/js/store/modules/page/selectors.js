import { parseQuery, stringifyQuery } from '~/helpers/query';
import entity from '~s/modules/entity/selectors';

const isActive = (state, entityName) => (
    state.pages.data[entityName].isActive
);

const getViewType = (state, entityName) => (
    state.pages.data[entityName].viewType
);

const getSelected = (state, entityName) => (
    state.pages.data[entityName].selected
);

const isSelected = (state, entityName, id) => (
    getSelected(state, entityName).includes(id)
)

const getSearchKeyword = (state, entityName) => (
    state.pages.data[entityName].searchKeyword
);

const getFilters = (state, entityName) => (
    state.pages.data[entityName].filters
);

const getLastQuery = (state, entityName) => (
    state.pages.data[entityName].lastQuery
);

const getCurrentQuery = (state) => (
    state.router.location.search.replace('?', '')
)

const getProcessing = (state, entityName) => (
    state.pages.data[entityName].processing
)
const isSearchActive = (state, entityName) => (
    getSearchKeyword(state, entityName).length > 0
);

const getStatus = (state, entityName, key) => (
    state.pages.status[entityName][key]
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

const getPage = (state, entityName, key) => {
    const status = getStatus(state, entityName, key);

    if (status) {
        return status.parsedParams.page;
    }
}

const getMaxPages = (state, entityName, key) => {
    const status = getStatus(state, entityName, key);

    if (status) {
        return status.maxPages;
    }
}

const getTotal = (state, entityName, key) => {
    const status = getStatus(state, entityName, key);

    if (status) {
        return status.total;
    }
}

const getLimit = (state, entityName, key) => {
    const status = getStatus(state, entityName, key);

    if (status) {
        return status.parsedParams.limit;
    }
}

const getActivePage = (state) => (
    Object.keys(state.pages).find(entityName => isActive(state, entityName))
);

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
    getStatusesdWithSameParams,
    getPage,
    getMaxPages,
    getTotal,
    getLimit,
    getActivePage,
    getCurrentQuery,
    getQueryAndParams,
}