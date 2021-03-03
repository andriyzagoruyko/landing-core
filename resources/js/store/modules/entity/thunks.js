import * as api from '~s/api/entity/index';
import { actions } from '~s/modules/entity/';

const makeRequest = async (dispatch, entityName, request) => {
    try {
        dispatch(actions.apiRequest(entityName, request));
        const result = await api[request.type](entityName, request);
        dispatch(actions.apiSuccess(entityName, request, result));
        return result;
    } catch (error) {
        dispatch(actions.apiError(entityName, request, error));
        console.log(error);
    }
};

const readEntities = (entityName, query, isMultiple = false) => (
    dispatch,
) =>
    makeRequest(dispatch, entityName, {
        query,
        isMultiple,
        type: 'get',
    });

const removeEntities = (entityName, ids) => (dispatch) =>
    makeRequest(dispatch, entityName, {
        query: ids,
        isMultiple: ids.length > 1,
        type: 'remove',
    });

const createEntity = (entityName, key, data) => (dispatch) =>
    makeRequest(dispatch, entityName, {
        key,
        data,
        type: 'create',
    });

const updateEntity = (entityName, id, data) => (dispatch) =>
    makeRequest(dispatch, entityName, {
        query: id,
        data,
        type: 'update',
    });

const updateOrCreateEntity = (entityName, data, key = '') => (
    dispatch,
) =>
    data.id
        ? dispatch(updateEntity(entityName, data.id, data))
        : dispatch(createEntity(entityName, key, data));

export {
    createEntity,
    readEntities,
    updateEntity,
    updateOrCreateEntity,
    removeEntities,
};
