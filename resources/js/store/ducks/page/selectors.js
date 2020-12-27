import { last } from 'lodash';
import { parseQuery, stringifyQuery } from '~/helpers/query';
import entity from '~s/ducks/entity/selectors';

const isActive = (state, entityName) => (
    state.pages[entityName].data.isActive
);

const getViewType = (state, entityName) => (
    state.pages[entityName].data.viewType
);

const getSelected = (state, entityName) => (
    state.pages[entityName].data.selected
);

const getSearchKeyword = (state, entityName) => (
    state.pages[entityName].data.searchKeyword
);

const getFilters = (state, entityName) => (
    state.pages[entityName].data.filters
);

const getLastQuery = (state, entityName) => (
    state.pages[entityName].data.lastQuery
);

/*const getQuery = (state, entityName) => {
    const currentQuery = state.router.location.search.replace('?', '');
    const status = entity.getStatus(state, entityName, currentQuery);

    if (status.result) {
        return currentQuery;
    }

    return getLastQuery(state, entityName);
}*/

const isSearchActive = (state, entityName) => (
    getSearchKeyword(state, entityName).length > 0
);

const getStatus = (state, entityName, key) => (
    state.pages[entityName].status[key]
);

const getStatusPage = (state, entityName, key) => {
    const status = getStatus(state, entityName, key);

    if (status) {
        return status.page;
    }
}

const getStatusMaxPages = (state, entityName, key) => {
    const status = getStatus(state, entityName, key);

    if (status) {
        return status.maxPages;
    }
}

const getStatusTotal = (state, entityName, key) => {
    const status = getStatus(state, entityName, key);

    if (status) {
        return status.total;
    }
}

const getStatusLimit = (state, entityName, key) => {
    const status = getStatus(state, entityName, key);

    if (status) {
        return status.limit;
    }
}

const getQueryAndParams = (state, entityName, restoreOnComeback = false, restoreAlways = [], initialParams = {}) => {
    const current = state.router.location.search.replace('?', '');
    const status = entity.getStatus(state, entityName, current);
    const last = getLastQuery(state, entityName);
    const saved = status.result ? current : last;
    const parsedLastQuery = parseQuery(last);

    let parsed = parseQuery(current);
    let restored = '';
    let isParamsRestored = false;

    if (restoreOnComeback && !isActive(state, entityName)) {
        for (let key in parsedLastQuery) {
            if (!parsed[key]) {
                parsed[key] = parsedLastQuery[key];
                isParamsRestored = true;
            }
        }
    }

    if (Object.keys(initialParams).length) {
        for (let key in initialParams) {
            if (!parsed[key]) {
                parsed[key] = restoreAlways.includes(key) && parsedLastQuery[key]
                    ? parsedLastQuery[key]
                    : initialParams[key]

                isParamsRestored = true;
            }
        }
    }

    if (isParamsRestored) {
        restored = stringifyQuery(parsed);
    }

    return { parsed, restored, saved, current };
}

const getActivePage = (state) => (
    Object.keys(state.pages).find(entityName => isActive(state, entityName))
);

export default {
    isActive,
    getActivePage,
    getViewType,
    getSelected,
    getSearchKeyword,
    isSearchActive,
    getFilters,
   // getQuery,
    getStatus,
    getStatusPage,
    getStatusMaxPages,
    getStatusTotal,
    getStatusLimit,
    getQueryAndParams
}