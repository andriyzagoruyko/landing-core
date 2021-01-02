import { push, replace } from 'connected-react-router';
import { composeQuery, stringifyQuery } from '~/helpers/query'
import { plural } from '~/helpers/plural';

/* Actions */
import { operations as notices } from '~s/ducks/notices'
import actions from './actions';

/* Selectors */
import { selectors as entitySelectors } from '~s/ducks/entity';
import { operations as entityActions } from '~s/ducks/entity';
import selectors from './selectors';

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
        dispatch(entityActions.readEntities(entityName, query, true));
    }
}

const changePage = (entityName, page, perPage = null, newQuery = '') => async (dispatch, getState) => {
    const state = getState();
    const currentQuery = selectors.getCurrentQuery(state);
    const limit = !perPage ? selectors.getLimit(state, entityName, currentQuery) : perPage;
    const query = composeQuery(newQuery || currentQuery, { page, limit });
    const status = entitySelectors.getStatus(state, entityName, query);

    dispatch(push({ search: query }));

    if (!status.result || status.shouldUpdate) {
        await dispatch(entityActions.readEntities(entityName, query, true));
        dispatch(actions.setSelected(entityName, []));
    } else {
        dispatch(actions.setSelected(entityName, []));
    }
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
    const remove = { count: ids.length, single: ids.length === 1, pageEmpty: currentCount - ids.length <= 0 }
    const nextQuery = remove.pageEmpty ? composeQuery(query, { page: Math.max(1, currentPage - 1) }) : query;

    dispatch(setProcessing(entityName, true));
    dispatch(updateStatuses(entityName, query, {
        total: selectors.getTotal(state, entityName, query) - 1,
        maxPages: selectors.getMaxPages(state, entityName, query) - (remove.pageEmpty ? 1 : 0)
    }));

    await dispatch(entityActions.removeEntities(entityName, ids));
    await dispatch(entityActions.readEntities(entityName, nextQuery, true));

    dispatch(replace({ search: nextQuery }))
    dispatch(setProcessing(entityName, false));
    dispatch(notices.addNotice(`${remove.count} ${plural(entityName, remove.count)} has been removed`));
    dispatch(remove.single && selectors.isSelected(state, entityName, ids[0])
        ? selectEntity(entityName, ids[0])
        : actions.setSelected(entityName, []));
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
    dispatch(actions.setSelected(entityName, selected.includes(id)
        ? selected.filter(i => i !== id)
        : [...selected].concat([id]))
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