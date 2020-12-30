import { request } from '~/api/api.js';
import { parseQuery } from '~/helpers/query'
import actions from './actions';

const readEntity = (entityName, id) => async dispatch => {
    try {
        dispatch(actions.entityFetch(entityName, id));
        const result = await request('GET', entityName, id, false);
        dispatch(actions.entityFetchSuccess(entityName, result, id, false));
        return result;
    } catch (e) {
        dispatch(actions.entityFetchError(entityName, id, false));
    }
}

const readEntities = (entityName, params) => async (dispatch, getState) => {
    const parsedParams = parseQuery(params);

    try {
        dispatch(actions.entityFetch(entityName, params, true));
        const result = await request('GET', entityName, params, true);
        dispatch(actions.entityFetchSuccess(entityName, result, params, parsedParams, true));
        return result;
    } catch (e) {
        console.log(e);
        dispatch(actions.entityFetchError(entityName, params, true));
    }
}

const removeEntities = (entityName, ids) => async (dispatch, getState) => {
    try {
        dispatch(actions.entityDelete(entityName, ids));
        await request('DELETE', entityName, ids, ids.length > 1);
        dispatch(actions.entityDeleteSuccess(entityName, ids));
    } catch (e) {
        console.log(e);
        dispatch(actions.entityDeleteError(entityName, ids));
    }
}

const cleanEntitiesStatus = (entityName, exceptKeys = [], updateKey) => async (dispatch, getState) => {
    const state = getState();
    const statuses = state.entities[entityName].status;
    
    const newStatuses = Object.fromEntries(
        Object.entries(statuses).filter(([key]) => exceptKeys.includes(key))
    );

    if (updateKey && newStatuses[updateKey]) {
        newStatuses[updateKey].shouldUpdate = true;
    }

    dispatch(actions.entitySetStatus(entityName, newStatuses));
}

export default {
    readEntity,
    readEntities,
    removeEntities,
    cleanEntitiesStatus
}