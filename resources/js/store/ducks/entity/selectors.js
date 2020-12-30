import { getEntitySchema } from '~s/ducks/schema';
import { denormalize } from 'normalizr';

const getEntitiesForDenormalization = state => (
    Object.keys(state.entities).reduce(
        (result, key) => ({ ...result, [key]: state.entities[key].data }),
        {},
    )
);

const getStatus = (state, entityName, key) => (
    state.entities[entityName].status[key] || {}
);

const getEntity = (state, entityName, id) => {
    if (id) {
        return state.entities[entityName].data
            .find(ent => ent.id === id);
    }
}

const getCollectionByArray = (state, entityName, array) => {
    return denormalize(
        array,
        getEntitySchema(entityName, true),
        getEntitiesForDenormalization(state),
    );
}

const getCollection = (state, entityName, key) => {
    let status = getStatus(state, entityName, key);

    if (!status || !status.result || !status.result.length) {
        return [];
    }

    return getCollectionByArray(state, entityName, status.result);
};

const getCollectionCount = (state, entityName, key) => (
    getCollection(state, entityName, key).length
)

export default {
    getEntity,
    getCollectionByArray,
    getCollection,
    getCollectionCount,
    getStatus
}