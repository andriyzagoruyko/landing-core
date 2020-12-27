import { normalize } from 'normalizr';
import { getEntitySchema } from '~s/ducks/schema';

import types from '~s/ducks/entity/types';

const normalizeMiddlewre = () => next => (action) => {
    if (action.type && action.type.includes(types.FETCH_SUCCESS)) {
        const schemaToNormalize = getEntitySchema(action.meta.entityName, action.meta.multiple)

        return next({
            ...action,
            payload: {
                ...action.payload,
                items: normalize(action.payload.items, schemaToNormalize)
            },
        });
    }

    return next(action);
};

export default normalizeMiddlewre;