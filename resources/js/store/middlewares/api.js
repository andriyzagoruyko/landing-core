
import api from '~s/api/entity';
import { parseQuery } from '~/helpers/query'
import { composeType } from '~s/ducks/helpers/';
import types from '~s/ducks/entity/types';

const operationsMap = {
    [composeType(types.CREATE)]: 'create',
    [composeType(types.FETCH)]: 'get',
    [composeType(types.DELETE)]: 'delete',
    [composeType(types.UPDATE)]: 'update',
}

const getOperation = type => operationsMap[type];

const pagesMiddleware = store => next => async action => {
    const { type } = action, nextAction = next(action)

    if (type && type.includes('_REQUEST')) {
        const { request, promise } = action;
        try {
            const operation = getOperation(type);
            const result = await api(action.meta.entityName, operation)(request);
            
            promise.resolve(result.data);
            store.dispatch({
                ...action,
                payload: result.data,
                type: type.replace('_REQUEST', '_SUCCESS'),
                parsed: request.multiple ? parseQuery(request.params) : {}
            });
        } catch (error) {
            promise.reject(error);
            store.dispatch({ ...action, error, type: type.replace('_REQUEST', '_ERROR') });
        }
    }

    return nextAction;
};

export default pagesMiddleware;