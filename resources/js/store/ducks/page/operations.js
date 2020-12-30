import { push, replace } from 'connected-react-router';
import { composeQuery, stringifyQuery } from '~/helpers/query'
import { plural } from '~/helpers/plural';
import { composeType } from '~s/ducks/helpers/';

/* Actions */
import { operations as notices } from '~s/ducks/notices'
import actions from './actions';

/* Selectors */
import { selectors as entitySelectors } from '~s/ducks/entity';
import { operations as entityActions } from '~s/ducks/entity';
import selectors from './selectors';

/* Types*/
import { types as entityTypes } from '~s/ducks/entity';

const setFilters = (entityName, filters) => actions.setFilterItems(entityName, filters);
const setSearchKeyword = (entityName, filters) => actions.setSearchKeyword(entityName, filters);
const setViewType = (entityName, viewType) => actions.setViewType(entityName, viewType);
const setActive = (entityName, viewType) => actions.setActive(entityName, viewType);
const setQuery = (entityName, query) => actions.setQuery(entityName, query);
const setProcessing = (entityName, processing) => actions.setProcessing(entityName, processing);

const initializePage = (entityName, query, search, filterStructure, filterParams) => async (dispatch, getState) => {
    const state = getState();
    const status = entitySelectors.getStatus(state, entityName, query);
    const filters = selectors.getIitialFilters(filterStructure, filterParams);
    const activeSearch = search.length > 0;
    const activeFilters = Object.values(filters).filter(f => f.active).length > 0;

    dispatch(setFilters(entityName, filters));
    dispatch(setSearchKeyword(entityName, search));
    dispatch(actions.setFiltersActive(entityName, activeFilters || activeSearch));

    if (!status.result || status.shouldUpdate) {
        dispatch(entityActions.readEntities(entityName, query));
    }
}

const changePage = (entityName, page, perPage = null, newQuery = '', method = push) => async (dispatch, getState) => {
    const state = getState();
    const currentQuery = selectors.getCurrentQuery(state);
    const query = newQuery || currentQuery;

    const limit = perPage === null
        ? selectors.getLimit(state, entityName, currentQuery)
        : perPage;

    dispatch(method({
        search: composeQuery(query, { page, limit })
    }));
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
    const count = {
        current: entitySelectors.getCollectionCount(state, entityName, query),
        remove: ids.length,
        isCollection: ids.length > 1,
    }
    const newStatus = {
        total: selectors.getTotal(state, entityName, query) - 1,
        maxPages: selectors.getMaxPages(state, entityName, query)
    }

    let page = selectors.getPage(state, entityName, query);
    let newQuery = query;

    if (count.current - count.remove <= 0) {
        newStatus.maxPages = Math.max(1, newStatus.maxPages - 1)
        newQuery = composeQuery(query, { page: Math.max(1, page - 1) });
        dispatch(replace({ search: newQuery }));
    }

    dispatch(updateStatuses(entityName, query, newStatus));
    dispatch(setProcessing(entityName, composeType(entityTypes.FETCH_SUCCESS, entityName)));
    await dispatch(entityActions.removeEntities(entityName, ids));
    await dispatch(entityActions.readEntities(entityName, newQuery));
    dispatch(notices.addNotice(`${count.remove} ${plural(entityName, count.remove)} has been removed`));

    if (count.isCollection) {
        dispatch(actions.setSelected(entityName, []));
    } else if (selectors.isSelected(state, entityName, ids[0])) {
        dispatch(actions.selectEntity(entityName, ids[0]));
    }
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

    const query = stringifyQuery({ search, ...filterParams }, { skipEmptyString: false });
    dispatch(changePage(entityName, 1, null, query));
    dispatch(actions.setFiltersActive(entityName, activeFilters || activeSearch));
}

const selectEntity = (entityName, id) => (dispatch, getState) => {
    const selected = selectors.getSelected(getState(), entityName);
    dispatch(
        actions.setSelected(entityName, !selected.includes(id)
            ? [...selected].concat([id])
            : selected.filter(i => i !== id))
    );
}

const selectMultiple = (entityName, ids) => (dispatch, getState) => {
    const selected = selectors.getSelected(getState(), entityName);
    dispatch(actions.setSelected(entityName, selected.length ? [] : ids));
}

export default {
    setActive,
    setQuery,
    setProcessing,
    setFilters,
    setSearchKeyword,
    setViewType,
    selectEntity,
    selectMultiple,
    removeEntitiesFromPage,
    changePage,
    confirmFilters,
    initializePage
}