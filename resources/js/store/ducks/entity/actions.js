import { composeType } from '~s/ducks/helpers';
import type from './types';

const entityFetch = (entityName, params, multiple = false) => ({
    type: composeType(type.FETCH, entityName),
    params,
    meta: { multiple }
});

const entityFetchSuccess = (entityName, items, params, parsedParams, multiple = false) => ({
    type: composeType(type.FETCH_SUCCESS, entityName),
    payload: items,
    params,
    parsedParams,
    meta: { entityName, multiple }
});

const entityFetchError = (entityName, params, error) => ({
    type: composeType(type.FETCH_ERROR, entityName),
    params,
    error,
});

const entityDelete = (entityName, params) => ({
    type: composeType(type.DELETE, entityName),
    meta: { entityName },
    params
});

const entityDeleteSuccess = (entityName, params) => ({
    type: composeType(type.DELETE_SUCCESS, entityName),
    meta: { entityName },
    params
});

const entityDeleteError = (entityName, params) => ({
    type: composeType(type.DELETE_ERROR, entityName),
    meta: { entityName },
    params
});

const entitySetStatus = (entityName, statuses) => ({
    type: composeType(type.SET_STATUS, entityName),
    payload: statuses
});

export default {
    entityFetch,
    entityFetchSuccess,
    entityFetchError,
    entityDelete,
    entityDeleteSuccess,
    entityDeleteError,
    entitySetStatus
}