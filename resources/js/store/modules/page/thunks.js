import { push, replace } from 'connected-react-router';
import { composeQuery, stringifyQuery } from '~/helpers/query'
import { plural } from '~/helpers/';

/* Actions */
import { actions } from './';
import entityActions from '~s/modules/entity/thunks';

/* Selectors */
import selectors from './selectors';
import entitySelectors from '~s/modules/entity/selectors';

/* Helpers */
import { getFiltersFromParams } from '~c/common/Filter/helpers';

const setFilters = (entityName, filters) => actions.setFilters(entityName, filters);
const setSearch = (entityName, filters) => actions.setSearch(entityName, filters);
const setViewType = (entityName, viewType) => actions.setViewType(entityName, viewType);
const setActive = (entityName, viewType) => actions.setActive(entityName, viewType);
const setQuery = (entityName, query) => actions.setQuery(entityName, query);
const setProcessing = (entityName, processing) => actions.setProcessing(entityName, processing);

const initializePage = (entityName, params) => async (dispatch, getState) => {
    const state = getState();
    const { query, restoredQuery, defaultViewType, search, filterStructure, filterParams } = params;
    const status = entitySelectors.getStatus(state, entityName, query);
    const viewType = selectors.getViewType(state, entityName);
    const filters = getFiltersFromParams(filterStructure, filterParams);

    dispatch(setFilters(entityName, filters));
    dispatch(setSearch(entityName, search));

    if (!viewType && defaultViewType) {
        dispatch(setViewType(entityName, defaultViewType));
    }

    if (restoredQuery) {
        dispatch(replace({ search: restoredQuery }));
    }

    if (status.result) {
        dispatch(setQuery(entityName, query));
    }

    if (!status.isFetching && (!status.result || status.error || status.shouldUpdate)) {
        dispatch(entityActions.readEntities(entityName, query, true));
    }
}

const changePage = (entityName, page, perPage = null, newQuery = '') => async (dispatch, getState) => {
    const state = getState();
    const currentQuery = selectors.getCurrentQuery(state);
    const limit = !perPage ? selectors.getLimit(state, entityName, currentQuery) : perPage;
    const query = composeQuery(newQuery || currentQuery, { page, limit });

    dispatch(push({ search: query }));
    dispatch(actions.setSelected(entityName, []));
}

const updateStatuses = (entityName, query, newStatus) => async (dispatch, getState) => {
    const state = getState();
    const statuses = selectors.getStatusesdWithSameParams(state, entityName, query);
    const { page: currentPage, limit: currentLimit } = selectors.getStatus(state, entityName, query).parsedParams;

    for (let key in statuses) {
        const { page, limit } = statuses[key].parsedParams;

        if (page <= currentPage && limit === currentLimit) {
            statuses[key] = { ...statuses[key], ...newStatus }
        } else {
            delete statuses[key];
        }
    }

    dispatch(actions.setStatus(entityName, statuses));
    dispatch(entityActions.cleanEntitiesStatus(entityName, Object.keys(statuses), query));
}

const removeEntitiesFromPage = (entityName, ids) => async (dispatch, getState) => {
    const state = getState();
    const query = selectors.getCurrentQuery(state);
    const currentCount = entitySelectors.getCollectionCount(state, entityName, query);
    const currentPage = selectors.getPage(state, entityName, query);
    const remove = { count: ids.length, pageEmpty: currentCount - ids.length <= 0 }
    const nextQuery = remove.pageEmpty ? composeQuery(query, { page: Math.max(1, currentPage - 1) }) : query;

    withProcessingStatus(async () => {
        await dispatch(entityActions.removeEntities(entityName, ids));
        await dispatch(updateStatuses(entityName, query, {
            total: selectors.getTotal(state, entityName, query) - 1,
            maxPages: selectors.getMaxPages(state, entityName, query) - (remove.pageEmpty ? 1 : 0)
        }));

        await dispatch(entityActions.readEntities(entityName, nextQuery, true, {
            message: `${remove.count} ${plural(entityName, remove.count)} has been removed`,
        }));

        dispatch(replace({ search: nextQuery }));

        dispatch(ids.length === 1 && selectors.isSelected(state, entityName, ids[0])
            ? selectEntity(entityName, ids[0])
            : actions.setSelected(entityName, []));

    }, entityName, dispatch);
}

const confirmFilters = (entityName) => async (dispatch, getState) => {
    const state = getState();
    const search = selectors.getSearchKeyword(state, entityName);
    const filterItems = selectors.getFilters(state, entityName);
    let filterParams = {}, activeFilters = false, activeSearch = search.length > 0;

    Object.values(filterItems).forEach(({ active, name, value }) => {
        if (active) {
            filterParams[name] = value;
            activeFilters = true;
        } else {
            filterParams[name] = '';
        }
    });

    withProcessingStatus(() => {
        const query = stringifyQuery({ search, ...filterParams }, { skipEmptyString: false });
        dispatch(changePage(entityName, 1, null, query));
    }, entityName, dispatch);
}

const selectEntity = (entityName, id) => (dispatch, getState) => {
    const selected = selectors.getSelected(getState(), entityName);
    dispatch(actions.setSelected(entityName, selected.includes(id)
        ? selected.filter(i => i !== id)
        : [...selected].concat([id]))
    );
}

const selectMultiple = (entityName, ids) => (dispatch, getState) => {
    const selected = selectors.getSelected(getState(), entityName);
    dispatch(actions.setSelected(entityName, selected.length ? [] : ids));
}

const withProcessingStatus = async (opearion, entityName, dispatch) => {
    dispatch(setProcessing(entityName, true));
    await opearion();
    dispatch(setProcessing(entityName, false));
}

export default {
    setActive,
    setQuery,
    setProcessing,
    setFilters,
    setSearch,
    setViewType,
    selectEntity,
    selectMultiple,
    removeEntitiesFromPage,
    changePage,
    confirmFilters,
    initializePage
}