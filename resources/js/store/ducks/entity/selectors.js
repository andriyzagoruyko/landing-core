import { getEntitySchema } from '~s/ducks/schema';
import { denormalize } from 'normalizr';

const getEntitiesForDenormalization = state => (
    Object.keys(state.entities.data).reduce(
        (result, key) => ({ ...result, [key]: state.entities.data[key] }),
        {},
    )
);

const getStatus = (state, entityName, key) => (
    state.entities.status[entityName][key] || {}
);

const getEntity = (state, entityName, id) => {
    if (id) {
        return denormalize(
            state.entities.data[entityName][id],
            getEntitySchema(entityName, true),
            getEntitiesForDenormalization(state),
        );
    }
}

const getCollectionByArray = (state, entityName, array) => {
    const result = denormalize(
        array,
        getEntitySchema(entityName, true),
        getEntitiesForDenormalization(state),
    );

    return result.length ? result.filter(Boolean) : [];
}

const getCollection = (state, entityName, key) => {
    let status = getStatus(state, entityName, key);

    if (!status.result || !status.result.length) {
        return [];
    }

    return getCollectionByArray(state, entityName, status.result);
};

const getCollectionCount = (state, entityName, key) => (
    getCollection(state, entityName, key).length
)

const getParent = (state, entityName, id) => {
    const entity = getEntity(state, entityName, id);
    return entity.parent_id;
}

const getAllStatuses = (state, entityName) => (
    state.entities.status[entityName]
)

export default {
    getEntity,
    getCollectionByArray,
    getCollection,
    getCollectionCount,
    getAllStatuses,
    getStatus,
    getParent
}