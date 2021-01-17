import selectors from './selectors';
import { actions } from '~s/ducks/entity/'
import noties from '~s/ducks/notifier/actions';
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

const readEntities = (entityName, query, isMultiple = false, notice = {}) => async dispatch => (
    makeRequest(dispatch, entityName, {
        query,
        isMultiple,
        type: 'get'
    }, notice)
);

const removeEntities = (entityName, ids, notice = {}) => async (dispatch, getState) => (
    makeRequest(dispatch, entityName, {
        type: 'remove',
        isMultiple: ids.length > 1,
        query: ids,
    }, notice)
);

const createEntity = (entityName, key, data) => async dispatch => {
    await makeRequest(dispatch, entityName, { key, data, type: 'create' }, notice);
    dispatch(cleanEntitiesStatus(entityName));
}

const updateEntity = (entityName, id, data, notice) => async (dispatch, getState) => {

    return makeRequest(dispatch, entityName, { query: id, data, type: 'update' }, notice);

    /*
    const state = getState();
    const oldParent = selectors.getParent(state, entityName, id);
    const newParent = data.parent_id;
    if (newParent != oldParent) {
        oldParent && dispatch(actions.detachChildren(entityName, oldParent, id));
        newParent && dispatch(actions.attachChildren(entityName, newParent, id));

        const statuses = { ...selectors.getAllStatuses(state, entityName) };

        if (statuses.root && (!newParent || !oldParent)) {
            statuses.root.result = !oldParent
                ? statuses.root.result.filter(r => r !== id)
                : statuses.root.result.concat([id]);


            dispatch(actions.setStatus(entityName, statuses));
        }
    }*/
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

    console.log('gggggggggggggggggggg', newStatuses[updateKey]);

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