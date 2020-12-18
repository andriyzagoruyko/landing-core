import { HISTORY_EXTRACT } from '../middlewares/historyState';
import {
    CATEGORIES_SET_LIST,
    CATEGORIES_SET_SINGLE,
    CATEGORIES_SET_FETCHING,
    CATEGORIES_SET_SELECTED,
    CATEGORIES_SET_INITIALIZED,
    CATEGORIES_SET_SEARCH,
    CATEGORIES_SET_FILTERS,
} from '../actionTypes/categories'


export const initialState = {
    maxPages: 0,
    total: 0,
    isInitialized: false,
    isError: false,
    isFetching: false,
    isSingleError: false,
    lastQueryParams: '',
    searchKeyword: '',
    items: [],
    selected: {},
    filters: {},
    single: {},
}

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_SET_SELECTED: return { ...state, selected: action.selected }
        case CATEGORIES_SET_SEARCH: return { ...state, searchKeyword: action.searchKeyword }
        case CATEGORIES_SET_FILTERS: return { ...state, filters: action.filters }
        case CATEGORIES_SET_INITIALIZED: return { ...state, isInitialized: action.isInitialized, isError: action.isError }

        case CATEGORIES_SET_LIST:
            return {
                ...state,
                total: action.total,
                maxPages: action.maxPages,
                items: action.items,
                lastQueryParams: action.lastQueryParams
            };

        case CATEGORIES_SET_SINGLE:
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

        default: return state;
    }
}
