import { normalize } from 'normalizr';
import { getEntitySchema } from '~s/ducks/schema';
import { composeType } from '~s/ducks/helpers/';
import types from '~s/ducks/entity/types';

const normalizeMiddlewre = () => next => (action) => {
    if (action.type === composeType(types.FETCH, 'SUCCESS')) {
        const schema = getEntitySchema(action.meta.entityName, action.request.multiple);

        const payload = {
            ...action.payload,
            items: normalize(action.payload.items, schema)
        };

        return next({ ...action, payload, });
    }

    return next(action);
};

export default normalizeMiddlewre;