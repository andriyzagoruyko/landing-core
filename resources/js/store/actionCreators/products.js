import * as products from '~/api/products';
import { setLoading } from './app';
import { addNotice } from './notices';
import { push, replace } from 'connected-react-router';
import { urlBuilder } from '~/routes';
import {
    PRODUCTS_FETCH,
    PRODUCTS_SINGLE_FETCH,
    PRODUCTS_SET_INITIALIZED,
    PRODUCTS_SET_SELECTED,
    PRODUCTS_SET_SEARCH,
    PRODUCTS_SET_FILTERS,
    PRODUCTS_SET_VIEWTYPE,
} from '../actionTypes/products'
import queryStringConfig from '~/constants/queryStringConfig'
import { initializeFilter } from '~c/common/Filter';

const queryString = require('query-string');

const setProductsInitialized = (isInitialized, isError = false) => ({
    type: PRODUCTS_SET_INITIALIZED, isInitialized, isError
});

const setProductsFetched = (params, { data, total, last_page }) => ({
    type: PRODUCTS_FETCH,
    total,
    items: data,
    maxPages: last_page,
    lastQueryParams: params
});

const setSingleFetched = (product, isError) => ({
    type: PRODUCTS_SINGLE_FETCH,
    single: product,
    isError
});

const setProductsSelected = (selected) => ({ type: PRODUCTS_SET_SELECTED, selected });
const setProductsSearch = (searchKeyword) => ({ type: PRODUCTS_SET_SEARCH, searchKeyword });
const setProductsFilters = (filters) => ({ type: PRODUCTS_SET_FILTERS, filters });
const setProductsViewType = (viewType) => ({ type: PRODUCTS_SET_VIEWTYPE, viewType });

const initializeProducts = (queryParams, searchKeyword, filterParams, filterStructure) => async (dispatch, getState) => {
    const filterItems = initializeFilter(filterStructure, filterParams);

    dispatch(setLoading(true));
    await dispatch(fetchProducts(queryParams));
    dispatch(setProductsSearch(searchKeyword));
    dispatch(setProductsFilters(filterItems));

    const state = getState();

    console.log(getState().router.location);

    dispatch(replace({ ...state.router.location, search: queryParams, state }));
    dispatch(setLoading(false));
}

const fetchProducts = (params) => async (dispatch, getState) => {
    try {
        dispatch(setProductsFetched(params, await products.all(params)));
        dispatch(setProductsInitialized(true));
    } catch (e) {
        dispatch(setProductsInitialized(false, true));
    }
}

const fetchSingleProduct = (id) => async dispatch => {
    try {
        dispatch(setLoading(true));
        dispatch(setSingleFetched(await products.get(id), false));
    } catch (e) {
        dispatch(setSingleFetched({}, true));
    }
    dispatch(setLoading(false));
}

const changePage = (page, limit) => async (dispatch, getState) => {
    let location = getState().router.location;
    const search = queryString.stringify(
        { ...queryString.parse(location.search, queryStringConfig), page, limit },
        queryStringConfig
    );

    dispatch(setProductsSelected({}));
    dispatch(push({ ...location, search }));

        /* dispatch(setLoading(true));
    await dispatch(fetchProducts(search));
    dispatch(setProductsSelected({}));
    dispatch(setLoading(false));


    const state = getState();
    dispatch(push({ ...state.router.location, search, state }));
    dispatch(setProductsSelected({}));*/
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
        dispatch(setSingleFetched(product, false))
    }

    dispatch(fetchSingleProduct(id));
    dispatch(push(path, getState()));

    /* if (!product) {
         dispatch(fetchSingleProduct(id));
     } else {
         dispatch(setSingleFetched(product, false));
     }*/
}

const updateProduct = (id, data) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        dispatch(setSingleFetched(await products.update(id, data)));
        dispatch(setProductsInitialized(false));
        dispatch(addNotice('Product has been updated', 'success'));
        const state = getState();
        dispatch(replace({ ...state.router.location, state }));
    } catch (e) {
        dispatch(addNotice(e.message, 'error'));
    }

    dispatch(setLoading(false));
}

const makeSearch = () => async (dispatch, getState) => {
    const state = getState(),
        searchKeyword = state.products.searchKeyword,
        location = state.router.location;

    const search = queryString.stringify(
        {
            ...queryString.parse(location.search, queryStringConfig),
            page: 1,
            search: searchKeyword
        },
        queryStringConfig
    );

    dispatch(setLoading(true));
    await dispatch(fetchProducts(search));
    dispatch(push({ ...location, search, state }));
    dispatch(setLoading(false));
}

const submitFilters = (filters) => async (dispatch, getState) => {
    const state = getState(),
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

    dispatch(setProductsFilters(filters));
    dispatch(setLoading(true));
    await dispatch(fetchProducts(search));
    dispatch(push({ ...location, search, state }));
    dispatch(setLoading(false));
}

export {
    initializeProducts,
    fetchProducts,
    removeProducts,
    createProduct,
    updateProduct,
    editProduct,
    changePage,
    selectProducts,
    makeSearch,
    submitFilters,
    fetchSingleProduct,
    setProductsSearch,
    setProductsFilters,
    setProductsInitialized,
    setProductsViewType
}