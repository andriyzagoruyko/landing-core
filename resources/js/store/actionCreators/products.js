import { setLoading } from './app'
import { addNotice } from './notices'
import { PRODUCTS_FETCH_SUCCES, REMOVE_PRODUCT_SUCCES, PRODUCTS_CREATED } from '../actionTypes/products'
import * as products from '~/api/products';

const fetchProductsSuccess = (payload) => {
    return {
        type: PRODUCTS_FETCH_SUCCES,
        payload
    }
}

const fetchProducts = () => async dispatch => {
    dispatch(setLoading(true));
    dispatch(fetchProductsSuccess(await products.get()));
    dispatch(setLoading(false));
}

const removeProductSucces = (payload) => {
    return {
        type: REMOVE_PRODUCT_SUCCES,
        payload
    }
}

const removeProducts = (id) => async dispatch => {
    try {
        dispatch(setLoading(true));

        await products.remove(id);

        dispatch(removeProductSucces(id));
        dispatch(addNotice('Product has been removed', 'success'));
    } catch (e) {
        dispatch(addNotice(e.message, 'error'));
    }

    dispatch(setLoading(false));
}

const createProduct = (data) => async dispatch => {
    try {
        dispatch(setLoading(true));

        const product = await products.create(data);
        
        dispatch(productCreated(product));
        dispatch(addNotice('Product has been added', 'success'));
    } catch (e) {
        dispatch(addNotice(e.message, 'error'));
    }

    dispatch(setLoading(false));
}

const productCreated = (product) => {
    return {
        type: PRODUCTS_CREATED,
        payload: product
    }
} 

export { fetchProducts, removeProducts, createProduct }