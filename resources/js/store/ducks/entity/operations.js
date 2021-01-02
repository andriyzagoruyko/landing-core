import actions from './actions';
import type from './types';
import { composeType } from '~s/ducks/helpers';

const api = (entityName, type, request) => dispatch => new Promise((resolve, reject) => {
    dispatch({
        type: composeType(type),
        meta: { entityName },
        promise: { resolve, reject },
        request,
    });
});

const readEntities = (entityName, params, multiple = false) => dispatch => (
    dispatch(api(entityName, type.FETCH, { multiple, params }))
);

const removeEntities = (entityName, ids) => async dispatch => (
    dispatch(api(entityName, type.DELETE, { multiple: ids.length > 1, params: ids }))
);

const createEntity = (entityName, key, data) => async dispatch => (
    dispatch(api(entityName, type.CREATE, { params: key, data }))
);

const updateEntity = (entityName, id, data) => async dispatch => (
    dispatch(api(entityName, type.UPDATE, { params: id, data }))
);

const cleanEntitiesStatus = (entityName, exceptKeys = [], updateKey) => async (dispatch, getState) => {
    const state = getState();
    const statuses = state.entities[entityName].status;

    const newStatuses = Object.fromEntries(
        Object.entries(statuses).filter(([key]) => exceptKeys.includes(key))
    );

    if (updateKey && newStatuses[updateKey]) {
        newStatuses[updateKey].shouldUpdate = true;
    }

    dispatch(actions.setStatus(entityName, newStatuses));
}

export default {
    createEntity,
    readEntities,
    updateEntity,
    removeEntities,
    cleanEntitiesStatus
}