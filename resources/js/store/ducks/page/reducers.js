import { combineReducers } from 'redux';
import { composeType } from '~s/ducks/helpers';
import { types as entityTypes } from '~s/ducks/entity/';
import types from './types.js';

const initialStatePage = {
    lastQuery: '',
    viewType: 'grid',
    searchKeyword: '',
    processing: '',
    filters: {},
    selected: [],
    isActive: false,
    isFiltersActive: false,
}

const pageReducer = entityName => (state = initialStatePage, action) => {
 

    switch (action.type) {
        case composeType(entityTypes.FETCH_SUCCESS, entityName):
            if (action.meta.multiple) {
                return { ...state, lastQuery: action.params }
            }

            break;

        case composeType(types.SET_PROPS, entityName):
            return { ...state, props: { ...state.props, ...action.payload } }

        case composeType(types.SET_VIEWTYPE, entityName):
            return { ...state, viewType: action.payload }

        case composeType(types.SET_SEARCH, entityName):
            return { ...state, searchKeyword: action.payload }

        case composeType(types.SET_FILTERS, entityName):
            return { ...state, filters: action.payload }

        case composeType(types.SET_FILTERS_ACTIVE, entityName):
            return { ...state, isFiltersActive: action.payload }

        case composeType(types.SET_SELECTED, entityName):
            return { ...state, selected: action.payload }

        case composeType(types.SET_QUERY, entityName):
            return { ...state, lastQuery: action.payload }

        case composeType(types.SET_ACTIVE, entityName):
            return { ...state, isActive: action.payload }

        case composeType(types.SET_PROCESSING, entityName):
            return { ...state, processing: action.payload }
    }

    return state;
}


const statusReducer = entityName => (state = {}, action) => {
    switch (action.type) {
        /*case composeType(types.FETCH, entityName):
            return {
                ...state,
                [action.params]: { ...state[action.params], isFetching: true, error: null }
            }
*/
        case composeType(entityTypes.FETCH_SUCCESS, entityName):
            if (action.meta.multiple) {
                return {
                    ...state,
                    [action.params]: {
                        maxPages: action.payload.maxPages,
                        total: action.payload.total,
                        parsedParams: action.parsedParams
                    }
                }
            }

            break;

        case composeType(types.SET_STATUS, entityName):
            return { ...state, ...action.payload }

        /*case composeType(entityTypes.FETCH_ERROR, entityName):
            return {
                ...state,
                [action.params]: { isFetching: false, error: action.error }
            }*/
    }

    return state;
}


const getReducers = entityName => (
    combineReducers({
        data: pageReducer(entityName),
        status: statusReducer(entityName),
    })
);


export default getReducers;