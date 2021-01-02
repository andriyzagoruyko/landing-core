export const composeType = (type, stage = 'REQUEST') => `${type}_${stage}`;

export const action = (entityName, type, payload) => ({
    type,
    meta: { entityName },
    payload
});

export const isValidAction = (entityName, action) => (
    action.type && action.meta && action.meta.entityName === entityName
);