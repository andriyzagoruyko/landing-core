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

const removeEntitiesFromPage = (entityName, ids) => async (dispatch, getState) => {
    await dispatch(entityActions.removeEntities(entityName, ids));

    const state = getState();
    const search = state.router.location.search.replace('?', '');
    const removeItemsNum = ids.length;
    const entities = entitySelectors.getCollection(state, entityName, search);

    let limit = selectors.getStatusLimit(state, entityName, search);
    let page = selectors.getStatusPage(state, entityName, search);
    let maxPages = selectors.getStatusMaxPages(state, entityName, search);

    if (entities.length - removeItemsNum <= 0) {
        page = Math.max(1, page - 1);
        maxPages = Math.max(1, maxPages - 1);
    }

    dispatch(notices.addNotice(`${removeItemsNum} ${plural(entityName, removeItemsNum)} has been removed`));
    dispatch(entityActions.cleanEntitiesStatus(entityName, search));

    dispatch(actions.setPageProps(entityName, { maxPages }));

    dispatch(changePage(entityName, page, limit, '', replace));

    if (removeItemsNum > 1) {
        dispatch(actions.setSelected(entityName, []));
    } else {
        if (selectors.getSelected(state, entityName).includes(ids[0])) {
            dispatch(actions.selectEntity(entityName, ids[0]));
        }
    }
}

const confirmFilters = (entityName) => async (dispatch, getState) => {
    const state = getState();
    const search = selectors.getSearchKeyword(state, entityName);
    const filterItems = selectors.getFilters(state, entityName);

    let filterParams = {};

    Object.values(filterItems).forEach(({ active, name, value }) => {
        filterParams[name] = active ? value : ''
    });

    const query = stringifyQuery({ search, ...filterParams }, { skipEmptyString: false });
    dispatch(changePage(entityName, 1, null, query));
}

const changePage = (entityName, page, perPage = null, newQuery = '', method = push) => async (dispatch, getState) => {
    const state = getState();
    const locationSearch = state.router.location.search.replace('?', '');
    const query = newQuery || locationSearch;

    const limit = perPage === null
        ? selectors.getStatusLimit(state, entityName, locationSearch)
        : perPage;

    dispatch(method({
        search: composeQuery(query, { page, limit })
    }));
}

export default {
    setActive,
    setQuery,
    setFilters,
    setSearchKeyword,
    setViewType,
    selectEntity,
    selectMultiple,
    removeEntitiesFromPage,
    changePage,
    confirmFilters,
}