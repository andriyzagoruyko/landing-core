import {
    PRODUCTS_LOADING,
    PRODUCTS_FETCH_SUCCES,
    PRODUCTS_FETCH_ERROR,
    REMOVE_PRODUCT_SUCCES,
    PRODUCTS_CREATED
} from '../actionTypes/products'


export const initialState = {
    isLoaded: false,
    products: []
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };

        case PRODUCTS_FETCH_SUCCES:
            return {
                ...state,
                products: action.payload,
                isLoaded: true
            };

        case PRODUCTS_FETCH_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            };

        case REMOVE_PRODUCT_SUCCES:
            return {
                ...state,
                products: state.products.filter(({ id }) => {
                    return Array.isArray(action.payload)
                        ? !action.payload.includes(id)
                        : id !== action.payload
                })
            };

        case PRODUCTS_CREATED:
            return !state.isLoaded ? state : {
                ...state,
                products: [action.payload].concat(state.products)
            }

        default: return state;
    }
}
