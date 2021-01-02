import { combineReducers } from 'redux';
import { composeType, isValidAction } from '~s/ducks/helpers';
import types from './types.js';

const dataReducer = entityName => (state = {}, action) => {
    if (!isValidAction(entityName, action)) {
        return state;
    }

    switch (action.type) {
        case composeType(types.FETCH, 'SUCCESS'):
            if (!action.payload.items.entities[entityName]) {
                return state;
            }
            return { ...state, ...action.payload.items.entities[entityName] }

        case composeType(types.UPDATE, 'SUCCESS'):
            return { ...state, [action.request.params]: action.payload }

        case composeType(types.CREATE, 'SUCCESS'):
            return { ...state, [action.request.params]: action.payload }
    }

    return state;
}

const statusReducer = entityName => (state = {}, action) => {
    if (!isValidAction(entityName, action)) {
        return state;
    }

    if (action.type === types.SET_STATUS) {
        return action.payload;
    }

    if (action.request) {
        const { type } = action;
        const { params } = action.request;

        if (type.includes('_REQUEST')) {
            return { ...state, [params]: { ...state[params], isFetching: true, error: null } }
        }

        if (type.includes('_SUCCESS')) {
            const { payload } = action;
            const { result } = payload && payload.items && payload.items.result
                ? payload.items : state[params];

            return {
                ...state,
                [params]: { ...state[params], isFetching: false, shouldUpdate: false, error: null, result }
            }
        }

        if (type.includes('_ERROR')) {
            return { ...state, [params]: { ...state[params], isFetching: false, error: action.error } }
        }
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