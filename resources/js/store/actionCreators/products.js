import * as products from '~/api/products';
import { setLoading } from './app'
import { addNotice } from './notices'
import { push, replace } from 'connected-react-router'
import {
    PRODUCTS_FETCH,
    PRODUCTS_CREATED,
    PRODUCTS_SET_INITIALIZED,
    PRODUCTS_SET_SELECTED,
    PRODUCTS_SET_SEARCH,
    PRODUCTS_SET_FILTERS,
} from '../actionTypes/products'
import queryStringConfig from '~/constants/queryStringConfig'
const queryString = require('query-string');

const setProductsInitialized = (isInitialized, isError = false) => ({ type: PRODUCTS_SET_INITIALIZED, isInitialized, isError });
const setProductsFetched = ({ data, last_page }) => ({ type: PRODUCTS_FETCH, items: data, maxPages: last_page });
const setProductsSelected = (selected) => ({ type: PRODUCTS_SET_SELECTED, selected });
const setProductsSearch = (search) => ({ type: PRODUCTS_SET_SEARCH, search });
const setProductsFilters = (filters) => ({ type: PRODUCTS_SET_FILTERS, filters });

const initializeProducts = (params) => async (dispatch, getState) => {
    const state = getState(),
        { isInitialized } = state.products,
        { location } = state.router;

    if (!isInitialized) {
        await dispatch(fetchProducts(params));
        dispatch(replace({ ...location, state: getState() }));
    }
}

const fetchProducts = (params) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        dispatch(setProductsFetched(await products.get(params)));
        dispatch(setProductsInitialized(true));
    } catch (e) {
        dispatch(setProductsInitialized(false, true));
    } finally {
        dispatch(setLoading(false));
    }
}

const changePage = (page, limit) => async (dispatch, getState) => {
    const location = getState().router.location;
    const search = queryString.stringify(
        { ...queryString.parse(location.search, queryStringConfig), page, limit },
        queryStringConfig
    );

    await dispatch(fetchProducts(search));
    dispatch(setProductsSelected({}));
    dispatch(push({ ...location, search, state: getState() }));
}

const selectProducts = (id) => (dispatch, getState) => {
    let newSelected = {};
    const state = getState().products;

    if (id) {
        newSelected = {
            ...state.selected,
            [id]: !state.selected[id]
        }
    } else if (!Object.values(state.selected).filter(i => i).length) {
        state.items.forEach(({ id }) => newSelected[id] = true);
    }

    dispatch(setProductsSelected(newSelected));
}

const removeProducts = (ids) => async (dispatch, getState) => {
    try {
        const state = getState(),
            { page = 1, ...params } = queryString.parse(location.search, queryStringConfig),
            isLastProduct = state.products.items.length - ids.length < 1,
            newPage = isLastProduct ? Math.max(1, page - 1) : page;

        const search = queryString.stringify({ ...params, page: newPage }, queryStringConfig);
        const notice = ids.length > 1 ? `${ids.length} products has been removed` : 'Product has been removed';

        dispatch(setLoading(true));

        await products.remove(ids);
        await dispatch(fetchProducts(search));

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

        const product = await products.create(data);

        dispatch(addNotice('Product has been added', 'success'));
        dispatch({
            type: PRODUCTS_CREATED,
            product
        });
    } catch (e) {
        dispatch(addNotice(e.message, 'error'));
    }

    dispatch(setLoading(false));
}

const makeSearch = () => async (dispatch, getState) => {
    const state = getState(),
        find = state.products.search,
        location = state.router.location;

    const search = queryString.stringify(
        {
            ...queryString.parse(location.search, queryStringConfig),
            page: 1,
            search: find
        },
        queryStringConfig
    );

    await dispatch(fetchProducts(search));

    dispatch(push({ ...location, search, state }));
}

const submitFilters = () => async (dispatch, getState) => {
    const state = getState(),
        filters = state.products.filters,
        location = state.router.location,
        params = queryString.parse(location.search, queryStringConfig);

    let filtersQuery = {};

    Object.values(filters).forEach(({ active, name, value }) => {
        if (active) {
            filtersQuery[name] = value
        } else {
            delete params[name];
        }
    })

    const search = queryString.stringify(
        {
            ...params,
            ...filtersQuery,
            page: 1
        },
        queryStringConfig
    );

    await dispatch(fetchProducts(search));
    dispatch(push({ ...location, search, state }));
}

export {
    initializeProducts,
    fetchProducts,
    removeProducts,
    createProduct,
    changePage,
    selectProducts,
    setProductsSearch,
    makeSearch,
    setProductsFilters,
    submitFilters,
}