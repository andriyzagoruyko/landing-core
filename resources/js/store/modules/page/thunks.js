import { push, replace } from 'connected-react-router';
import {
    composeQuery,
    stringifyQuery,
    parseQuery,
} from '~/helpers/query';
import { plural } from '~/helpers/';

/* Actions */
import { actions } from './';
import { actions as noties } from '~s/modules/notifier/';
import {
    readEntities,
    removeEntities,
} from '~s/modules/entity/thunks';

/* Selectors */
import selectors from './selectors';
import {
    getStatus,
    getCollectionCount,
} from '~s/modules/entity/selectors';

/* Helpers */
import { getFiltersFromParams } from '~c/common/Filter/helpers';

const withProcessing = async (opearion, entityName, dispatch) => {
    dispatch(actions.setProcessing(entityName, true));
    await opearion();
    dispatch(actions.setProcessing(entityName, false));
};

const restoreQueryParams = (currentParams, initialParams = {}) => (
    dispatch,
) => {
    let params = { ...currentParams };
    let isRestored = false;

    if (Object.keys(initialParams).length) {
        for (let key in initialParams) {
            if (!params[key]) {
                params[key] = initialParams[key];
                isRestored = true;
            }
        }
    }

    if (isRestored) {
        dispatch(replace({ search: stringifyQuery(params) }));
    }

    return { params, isRestored };
};

const initializePage = (
    entityName,
    {
        query,
        currentParams,
        initialParams,
        defaultViewType,
        search,
        filterStructure,
    },
) => (dispatch, getState) => {
    const { params, isRestored } = dispatch(
        restoreQueryParams(currentParams, initialParams),
    );

    if (!isRestored) {
        const state = getState();
        const status = getStatus(state, entityName, query, 'get');
        const filters = getFiltersFromParams(filterStructure, params);
        const viewType = selectors.getViewType(state, entityName);

        dispatch(actions.setFilters(entityName, filters));
        dispatch(actions.setSearch(entityName, search));
        dispatch(actions.setPage(entityName, params.page));
        dispatch(actions.setLimit(entityName, params.limit));

        if (!viewType && defaultViewType) {
            dispatch(
                actions.setViewType(entityName, defaultViewType),
            );
        }

        if (status.result) {
            dispatch(actions.setQuery(entityName, query));
        }

        if (!status.isProcessing) {
            dispatch(readEntities(entityName, query, true));
        }
    }
};

const changePage = (
    entityName,
    page,
    perPage = null,
    newQuery = '',
) => async (dispatch, getState) => {
    const state = getState();
    const currentQuery = selectors.getCurrentQuery(state);

    const limit = !perPage
        ? selectors.getLimit(state, entityName, currentQuery)
        : perPage;

    const query = composeQuery(newQuery || currentQuery, {
        page,
        limit,
    });

    dispatch(push({ search: query }));
    dispatch(actions.setSelected(entityName, []));
};

const removeEntitiesFromPage = (entityName, ids) => async (
    dispatch,
    getState,
) => {
    const state = getState();
    const query = selectors.getCurrentQuery(state);
    const currentCount = getCollectionCount(state, entityName, query);
    const currentPage = selectors.getPage(state, entityName, query);
    const maxPages = selectors.getMaxPages(state, entityName, query);
    const removeCount = ids.length;
    const isPageEmpty = currentCount - ids.length <= 0;

    withProcessing(
        async () => {
            await dispatch(removeEntities(entityName, ids));

            if (isPageEmpty && maxPages === currentPage) {
                const search = composeQuery(query, {
                    page: Math.max(1, currentPage - 1),
                });

                dispatch(replace({ search }));
            } else {
                await dispatch(readEntities(entityName, query, true));
            }

            if (removeCount === 1) {
                if (selectors.isSelected(state, entityName, ids[0])) {
                    dispatch(selectEntity(entityName, ids[0]));
                }
            } else {
                dispatch(actions.setSelected(entityName, []));
            }

            dispatch(
                noties.enqueueSnackbar({
                    options: { variant: 'info' },
                    message: `${removeCount} ${plural(
                        entityName,
                        removeCount,
                    )} has been removed`,
                }),
            );
        },
        entityName,
        dispatch,
    );
};

const confirmFilters = (entityName) => async (dispatch, getState) => {
    const state = getState();
    const search = selectors.getSearchKeyword(state, entityName);
    const filterItems = selectors.getFilters(state, entityName);
    let filterParams = {};

    Object.values(filterItems).forEach(({ active, name, value }) => {
        if (active) {
            filterParams[name] = value;
        } else {
            filterParams[name] = '';
        }
    });

    withProcessing(
        () => {
            const query = stringifyQuery(
                { search, ...filterParams },
                { skipEmptyString: false },
            );
            dispatch(changePage(entityName, 1, null, query));
        },
        entityName,
        dispatch,
    );
};

const selectEntity = (entityName, id) => (dispatch, getState) => {
    const selected = selectors.getSelected(getState(), entityName);
    dispatch(
        actions.setSelected(
            entityName,
            selected.includes(id)
                ? selected.filter((i) => i !== id)
                : [...selected].concat([id]),
        ),
    );
};

const selectMultiple = (entityName, ids) => (dispatch, getState) => {
    const selected = selectors.getSelected(getState(), entityName);
    dispatch(
        actions.setSelected(entityName, selected.length ? [] : ids),
    );
};

export default {
    ...actions,
    selectEntity,
    selectMultiple,
    removeEntitiesFromPage,
    changePage,
    confirmFilters,
    initializePage,
};
