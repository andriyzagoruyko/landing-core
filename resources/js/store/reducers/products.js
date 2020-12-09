import { HISTORY_EXTRACT } from '../middlewares/historyState';
import {
    PRODUCTS_FETCH,
    PRODUCTS_SET_SELECTED,
    PRODUCTS_SET_INITIALIZED,
    PRODUCTS_SET_SEARCH,
    PRODUCTS_SET_FILTERS
} from '../actionTypes/products'

export const initialState = {
    maxPages: 0,
    isInitialized: false,
    isError: false,
    search: '',
    items: [],
    selected: {},
    filters: {}
}
export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_SET_INITIALIZED: return { ...state, isInitialized: action.isInitialized, isError: action.isError }
        case PRODUCTS_FETCH: return { ...state, maxPages: action.maxPages, items: action.items };
        case PRODUCTS_SET_SELECTED: return { ...state, selected: action.selected }
        case PRODUCTS_SET_SEARCH: return { ...state, search: action.search }
        case PRODUCTS_SET_FILTERS: return { ...state, filters: action.filters }
        case HISTORY_EXTRACT: return { ...state, ...action.payload.products };
        default: return state;
    }
}
