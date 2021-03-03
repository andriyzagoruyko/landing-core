import Model from '~s/modules/entity/Model';
import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';

const getEntitySchema = (state, entityName, isMultiple = true) =>
    Model.getEntitySchema(entityName, isMultiple);

const selectStatus = (state, entityName, key, type) => {
    const statuses = state.entities.status[entityName][key];

    if (!type) {
        return statuses;
    }

    return statuses ? statuses[type] : {};
};

const getDenormilizedEntities = createSelector(
    (state) => state.entities,
    (entities) =>
        Object.keys(entities.data).reduce(
            (result, key) => ({
                ...result,
                [key]: entities.data[key],
            }),
            {},
        ),
);

const getStatus = createSelector(selectStatus, (status) => status);

const getCollectionByArray = createSelector(
    getDenormilizedEntities,
    getEntitySchema,
    (state, entityName, array) => array,
    (entities, schema, array) => {
        const result = denormalize(array, schema, entities);
        return result && result.length ? result.filter(Boolean) : [];
    },
);

const getCollection = createSelector(
    getStatus,
    getDenormilizedEntities,
    getEntitySchema,
    (status, entities, schema) => {
        if (!status?.get.result?.length) {
            return [];
        }

        const result = denormalize(
            status?.get?.result,
            schema,
            entities,
        );

        return result.filter(Boolean);
    },
);

const getEntity = createSelector(
    (state, entityName, id) =>
        id && state.entities.data[entityName][id],
    getDenormilizedEntities,
    getEntitySchema,
    (entity, denorm, schema) => {
        if (entity) {
            return denormalize(entity, schema, denorm);
        }
    },
);

const getCollectionCount = createSelector(
    getCollection,
    (entities) => entities.length,
);

export {
    getEntity,
    getCollectionByArray,
    getCollection,
    getCollectionCount,
    getStatus,
};
