import { combineReducers } from 'redux';
import { composeType, isValidAction } from '~s/ducks/helpers';
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
    if (!isValidAction(entityName, action)) {
        return state;
    }

    switch (action.type) {
        case composeType(entityTypes.FETCH, 'SUCCESS'):
            return action.request.multiple && state.isActive
                ? { ...state, lastQuery: action.request.params } : state

        case types.SET_PROPS:
            return { ...state, props: { ...state.props, ...action.payload } }

        case types.SET_VIEWTYPE:
            return { ...state, viewType: action.payload }

        case types.SET_SEARCH:
            return { ...state, searchKeyword: action.payload }

        case types.SET_FILTERS:
            return { ...state, filters: action.payload }

        case types.SET_FILTERS_ACTIVE:
            return { ...state, isFiltersActive: action.payload }

        case types.SET_SELECTED:
            return { ...state, selected: action.payload }

        case types.SET_QUERY:
            return { ...state, lastQuery: action.payload }

        case types.SET_ACTIVE:
            return { ...state, isActive: action.payload }

        case types.SET_PROCESSING:
            return { ...state, processing: action.payload }
    }

    return state;
}


const statusReducer = entityName => (state = {}, action) => {
    if (!isValidAction(entityName, action)) {
        return state;
    }

    switch (action.type) {
        /*case composeType(types.FETCH):
            return {
                ...state,
                [action.request.params]: { ...state[action.request.params], isFetching: true, error: null }
            }
*/
        case composeType(entityTypes.FETCH, 'SUCCESS'):
            if (action.request.multiple) {
                return {
                    ...state,
                    [action.request.params]: {
                        maxPages: action.payload.maxPages,
                        total: action.payload.total,
                        parsedParams: action.parsed
                    }
                }
            }

            break;

        case types.SET_STATUS: return { ...state, ...action.payload }

        /*case composeType(entityTypes.FETCH_ERROR, entityName):
            return {
                ...state,
                [action.request.params]: { isFetching: false, error: action.error }
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