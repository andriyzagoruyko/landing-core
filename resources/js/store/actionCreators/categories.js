import * as categories from '~/api/categories';
import {
    CATEGORIES_SET_LIST,
    CATEGORIES_SET_SINGLE,
    CATEGORIES_SET_FETCHING,
    CATEGORIES_SET_INITIALIZED,
    CATEGORIES_SET_SELECTED,
    CATEGORIES_SET_SEARCH,
    CATEGORIES_SET_FILTERS,
    CATEGORIES_SET_VIEWTYPE,
} from '../actionTypes/categories'

const setCategoriesFetching = (isFetching) => ({ type: CATEGORIES_SET_FETCHING, isFetching });


const setCategoriesList = (params, { data, total, last_page }) => ({
    type: CATEGORIES_SET_LIST,
    total,
    items: data,
    maxPages: last_page,
    lastQueryParams: params
});

const fetchCategoriesList = (params) => async (dispatch, getState) => {
    try {
        dispatch(setCategoriesFetching(true));
        dispatch(setCategoriesList(params, await categories.all()));
        dispatch(setCategoriesFetching(false));
    } catch (e) {
        console.log(e);
    }
}

export {
    fetchCategoriesList
}