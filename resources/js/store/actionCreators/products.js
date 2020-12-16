import * as products from '~/api/products';
import { setLoading } from './app';
import { addNotice } from './notices';
import { push, replace } from 'connected-react-router';
import { urlBuilder } from '~/routes';
import {
    PRODUCTS_SET_LIST,
    PRODUCTS_SET_SINGLE,
    PRODUCTS_SET_FETCHING,
    PRODUCTS_SET_INITIALIZED,
    PRODUCTS_SET_SELECTED,
    PRODUCTS_SET_SEARCH,
    PRODUCTS_SET_FILTERS,
    PRODUCTS_SET_VIEWTYPE,
} from '../actionTypes/products'
import { initializeFilter } from '~c/common/Filter';
import { parseQuery, stringifyQuery, composeQuery } from '~/helpers/query'

const setProductsFetching = (isFetching) => ({ type: PRODUCTS_SET_FETCHING, isFetching })
const setProductsSelected = (selected) => ({ type: PRODUCTS_SET_SELECTED, selected });
const setProductsSearch = (searchKeyword) => ({ type: PRODUCTS_SET_SEARCH, searchKeyword });
const setProductsFilters = (filters) => ({ type: PRODUCTS_SET_FILTERS, filters });
const setProductsViewType = (viewType) => ({ type: PRODUCTS_SET_VIEWTYPE, viewType });
const setProductsInitialized = (isInitialized, isError = false) => ({ type: PRODUCTS_SET_INITIALIZED, isInitialized, isError });

const setProductsList = (params, { data, total, last_page }) => ({
    type: PRODUCTS_SET_LIST,
    total,
    items: data,
    maxPages: last_page,
    lastQueryParams: params
});

const setProductsSingle = (product, isError) => ({
    type: PRODUCTS_SET_SINGLE,
    single: product,
    isError
});

const initializeProducts = (queryParams, searchKeyword, filterParams, filterStructure) => async (dispatch, getState) => {
    const filterItems = initializeFilter(filterStructure, filterParams);

    await dispatch(fetchProductsList(queryParams));
    dispatch(setProductsSearch(searchKeyword));
    dispatch(setProductsFilters(filterItems));

    const state = getState();
    dispatch(replace({ ...state.router.location, search: queryParams, state }));
}

const fetchProductsList = (params) => async (dispatch, getState) => {
    try {
        dispatch(setProductsFetching(true));
        dispatch(setProductsList(params, await products.all(params)));
        dispatch(setProductsFetching(false));
        dispatch(setProductsInitialized(true));
    } catch (e) {
        dispatch(setProductsInitialized(false, true));
    }
}

const fetchSingleProduct = (id) => async dispatch => {
    try {
        dispatch(setProductsSingle(await products.get(id), false));
    } catch (e) {
        dispatch(setProductsSingle({}, true));
    }
}

const changePage = (page, limit) => async (dispatch, getState) => {
    const location = getState().router.location;
    const search = composeQuery(location.search, { page, limit });

    dispatch(push({ ...location, search }));
    await dispatch(fetchProductsList(search));
    dispatch(setProductsSelected({}));
    window.scrollTo(0, 0);
}

const selectProducts = (id) => (dispatch, getState) => {
    let newSelected = {};
    const state = getState().products;

    if (id) {
        newSelected = { ...state.selected, [id]: !state.selected[id] }
    } else if (!Object.values(state.selected).filter(i => i).length) {
        state.items.forEach(({ id }) => newSelected[id] = true);
    }

    dispatch(setProductsSelected(newSelected));
}

const removeProducts = (ids) => async (dispatch, getState) => {
    try {
        const state = getState(),
            productsNum = ids.length,
            isLastProduct = state.products.items.length - productsNum < 1,
            { page = 1, ...params } = parseQuery(state.router.location.search),
            newPage = isLastProduct ? Math.max(1, page - 1) : page;

        const search = stringifyQuery({ ...params, page: newPage });
        const notice = productsNum > 1 ? `${productsNum} products has been removed` : 'Product has been removed';

        dispatch(setLoading(true));
        await products.remove(ids);
        await dispatch(fetchProductsList(search));
        dispatch(setProductsSelected({}));
        dispatch(replace({ search, state: getState() }));
        dispatch(addNotice(notice, 'success'));
    } catch (e) {
        dispatch(addNotice(e.message, 'error'));
    } finally {
        dispatch(setLoading(false));
    }
}

const createProduct = (data) => async dispatch => {
    try {
        dispatch(setLoading(true));
        await products.create(data);
        dispatch(addNotice('Product has been added', 'success'));
    } catch (e) {
        dispatch(addNotice(e.message, 'error'));
    }

    dispatch(setLoading(false));
}

const editProduct = (id) => (dispatch, getState) => {
    const product = getState().products.items.find(p => p.id === id),
        path = urlBuilder('productsEdit', { id });

    if (product) {
        dispatch(setProductsSingle(product, false))
    }

    dispatch(fetchSingleProduct(id));
    dispatch(push(path, getState()));
}

const updateProduct = (id, data) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        dispatch(setProductsSingle(await products.update(id, data)));
        dispatch(setProductsInitialized(false));
        dispatch(addNotice('Product has been updated', 'success'));
        const state = getState();
        dispatch(replace({ ...state.router.location, state }));
    } catch (e) {
        dispatch(addNotice(e.message, 'error'));
    }

    dispatch(setLoading(false));
}

const submitSearch = () => async (dispatch, getState) => {
    const state = getState(),
        location = state.router.location,
        searchKeyword = state.products.searchKeyword;

    const search = composeQuery(location.search, {
        page: 1,
        search: searchKeyword
    });

    dispatch(setLoading(true));
    await dispatch(fetchProductsList(search));
    dispatch(push({ ...location, search, state: getState() }));
    dispatch(setLoading(false));
}

const submitFilters = (filters) => async (dispatch, getState) => {
    const state = getState(),
        location = state.router.location,
        params = parseQuery(location.search);

    let filtersQuery = {};

    Object.values(filters).forEach(({ active, name, value }) => {
        if (active) {
            filtersQuery[name] = value
        } else {
            delete params[name];
        }
    })

    const search = stringifyQuery({ ...params, ...filtersQuery, page: 1 });

    dispatch(setProductsFilters(filters));
    dispatch(setLoading(true));
    await dispatch(fetchProductsList(search));
    dispatch(push({ ...location, search, state }));
    dispatch(setLoading(false));
}

export {
    initializeProducts,
    fetchProductsList,
    removeProducts,
    createProduct,
    updateProduct,
    editProduct,
    changePage,
    selectProducts,
    submitSearch,
    submitFilters,
    fetchSingleProduct,
    setProductsSearch,
    setProductsFilters,
    setProductsInitialized,
    setProductsViewType
}