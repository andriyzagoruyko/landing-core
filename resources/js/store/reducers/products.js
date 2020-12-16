import { HISTORY_EXTRACT } from '../middlewares/historyState';
import {
    PRODUCTS_SET_LIST,
    PRODUCTS_SET_SINGLE,
    PRODUCTS_SET_FETCHING,
    PRODUCTS_SET_SELECTED,
    PRODUCTS_SET_INITIALIZED,
    PRODUCTS_SET_SEARCH,
    PRODUCTS_SET_FILTERS,
    PRODUCTS_SET_VIEWTYPE
} from '../actionTypes/products'

export const initialState = {
    maxPages: 0,
    total: 0,
    lastQueryParams: '',
    isInitialized: false,
    isError: false,
    isFetching: false,
    viewType: 'grid',
    searchKeyword: '',
    items: [],
    selected: {},
    filters: {},
    single: {},
    isSingleError: false
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {

        case PRODUCTS_SET_INITIALIZED: return { ...state, isInitialized: action.isInitialized, isError: action.isError }
        case PRODUCTS_SET_FETCHING: return { ...state, isFetching: action.isFetching }
        case PRODUCTS_SET_SELECTED: return { ...state, selected: action.selected }
        case PRODUCTS_SET_SEARCH: return { ...state, searchKeyword: action.searchKeyword }
        case PRODUCTS_SET_FILTERS: return { ...state, filters: action.filters }
        case PRODUCTS_SET_VIEWTYPE: return { ...state, viewType: action.viewType }
        
        case PRODUCTS_SET_LIST:
            return {
                ...state,
                total: action.total,
                maxPages: action.maxPages,
                items: action.items,
                lastQueryParams: action.lastQueryParams
            };

        case PRODUCTS_SET_SINGLE:
            return {
                ...state,
                single: action.single,
                isSingleError: action.isError
            };

        case HISTORY_EXTRACT:
            return {
                ...state,
                items: action.payload.products.items,
                single: action.payload.products.single
            };

        //...action.payload.products
        default: return state;
    }
}
