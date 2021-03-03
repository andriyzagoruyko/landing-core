import { parseQuery } from '~/helpers/query';
import * as entity from '~s/modules/entity/selectors';
import { createSelector } from 'reselect';

const getPageData = (state, entityName) =>
    state.pages.data[entityName];

const isActive = createSelector(getPageData, (data) => data.isActive);

const getViewType = createSelector(
    getPageData,
    (data) => data.viewType,
);

const getSelected = createSelector(
    getPageData,
    (data) => data.selected,
);

const isSelected = createSelector(
    getPageData,
    (state, entityName, id) => id,
    (data, id) => data.selected.includes(id),
);

const getSearchKeyword = createSelector(
    getPageData,
    (data) => data.searchKeyword,
);

const isSearchActive = createSelector(
    getSearchKeyword,
    (keyword) => keyword.length > 0,
);

const getFilters = createSelector(
    getPageData,
    (data) => data.filters,
);

const getLastQuery = createSelector(
    getPageData,
    (data) => data.lastQuery,
);

const getProcessing = createSelector(
    getPageData,
    (data) => data.processing,
);

const getStatus = createSelector(
    (state, entityName, key) => state.pages.status[entityName][key],
    (status) => status,
);

const getPage = createSelector(getPageData, (data) => data.page);

const getMaxPages = createSelector(
    getStatus,
    (status) => status && status.maxPages,
);

const getTotal = createSelector(
    getStatus,
    (status) => status && status.total,
);

const getLimit = createSelector(getPageData, (data) => data.limit);

const getActivePage = createSelector(
    (state) => state.pages,
    (pages) =>
        pages.find((entityName) => isActive(state, entityName)),
);

const getCurrentQuery = (state) =>
    state.router.location.search.replace('?', '');

const getQueryAndParams = (state, entityName) => {
    const currentQuery = getCurrentQuery(state);
    const lastQuery = getLastQuery(state, entityName);
    const params = parseQuery(currentQuery);
    const status = entity.getStatus(
        state,
        entityName,
        currentQuery,
        'get',
    );
    const savedQuery = status?.get?.result ? currentQuery : lastQuery;

    return { params, savedQuery, currentQuery };
};

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
    getQueryAndParams,
};
