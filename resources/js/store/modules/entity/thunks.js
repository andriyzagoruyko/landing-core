import selectors from './selectors';
import { actions } from '~s/modules/entity/'
import { actions as noties } from '~s/modules/notifier/';
import * as api from '~s/api/entity/index';

const withNotification = async (dispatch, { message, variant = 'info' }, operation) => {
    try {
        await operation();

        if (message) {
            dispatch(noties.enqueueSnackbar({
                message,
                options: { variant },
            }))
        }
    } catch (error) {
        dispatch(noties.enqueueSnackbar({
            message: error.message, options: { variant: 'error', },
        }));

        console.log(error);

        throw (error);
    }
}

const makeRequest = async (dispatch, entityName, request, notice = '') => {
    try {
        await withNotification(dispatch, notice, async () => {
            dispatch(actions.apiRequest(entityName, request));
            const result = await api.[request.type](entityName, request);
            dispatch(actions.apiSuccess(entityName, request, result));
        });
    } catch (error) {
        dispatch(actions.apiError(entityName, request, error));
        console.log(error);
    }
}

const readEntities = (entityName, query, isMultiple = false, notice = {}) => dispatch => (
    makeRequest(dispatch, entityName, {
        query,
        isMultiple,
        type: 'get'
    }, notice)
);

const removeEntities = (entityName, ids, notice = {}) => dispatch => (
    makeRequest(dispatch, entityName, {
        query: ids,
        isMultiple: ids.length > 1,
        type: 'remove',
    }, notice)
);

const createEntity = (entityName, key, data) => async dispatch => {
    await makeRequest(dispatch, entityName, { key, data, type: 'create' }, notice);
    dispatch(cleanEntitiesStatus(entityName));
}

const updateEntity = (entityName, id, data, notice) => dispatch => {
    dispatch(actions.attach(entityName, id, data.parent_id));
    return makeRequest(dispatch, entityName, {
        query: id,
        data,
        type: 'update'
    }, notice);
}

const updateOrCreateEntity = (entityName, data, key = '') => async dispatch => (
    data.id
        ? dispatch(updateEntity(entityName, data.id, data))
        : dispatch(createEntity(entityName, key, data))
);

const cleanEntitiesStatus = (entityName, exceptKeys = [], updateKey) => async (dispatch, getState) => {
    const state = getState();
    const statuses = selectors.getAllStatuses(state, entityName);

    const newStatuses = Object.fromEntries(
        Object.entries(statuses).filter(([key]) => exceptKeys.includes(key))
    );

    dispatch(actions.setStatuses(entityName, {
        ...newStatuses,
        [updateKey]: {
            ...newStatuses[updateKey],
            shouldUpdate: true
        }
    }));
}

export default {
    createEntity,
    readEntities,
    updateEntity,
    updateOrCreateEntity,
    removeEntities,
    cleanEntitiesStatus,
}