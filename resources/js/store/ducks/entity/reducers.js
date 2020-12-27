import { combineReducers } from 'redux';
import { composeType } from '~s/ducks/helpers';
import types from './types.js';

const dataReducer = entityName => (state = {}, action) => {
    if (action.type.startsWith(types.FETCH_SUCCESS)) {
        if (!action.payload.items.entities[entityName]) {
            return state;
        }

        return { ...state, ...action.payload.items.entities[entityName] }
    }

    return state;
}

const statusReducer = entityName => (state = {}, action) => {
    switch (action.type) {
        case composeType(types.FETCH, entityName):
            return {
                ...state,
                [action.params]: { ...state[action.params], isFetching: true, error: null }
            }

        case composeType(types.FETCH_SUCCESS, entityName):
            return {
                ...state,
                [action.params]: {
                    isFetching: false,
                    error: null,
                    result: action.payload.items.result,
                    maxPages: action.payload.maxPages,
                    ...action.parsedParams
                }
            }

        case composeType(types.FETCH_ERROR, entityName):
            return {
                ...state,
                [action.params]: { isFetching: false, error: action.error }
            }

        case composeType(types.SET_STATUS, entityName):
            return action.payload
    }

    return state;
}


const getReducers = entityName => (
    combineReducers({
        data: dataReducer(entityName),
        status: statusReducer(entityName)
    })
);

export default getReducers;