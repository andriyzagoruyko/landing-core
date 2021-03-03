import { createSlice } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import Model from './Model';
import entityNames from './schema';

let initialState = { data: {}, status: {} };

entityNames.forEach((name) => {
    initialState.data[name] = {};
    initialState.status[name] = {};
});

const apiRequest = {
    reducer: (state, action) => {
        const { status } = state;
        const { entityName, type } = action.meta;
        const query = action.meta.key || action.meta.query;

        if (!status[entityName][query]) {
            status[entityName][query] = {};
        }

        if (!status[entityName][query][type]) {
            status[entityName][query][type] = {};
        }

        status[entityName][query][type].isProcessing = true;
    },
    prepare: (entityName, request) => ({
        meta: { entityName, ...request },
    }),
};

const apiSuccess = {
    reducer: (state, action) => {
        const { entityName, type } = action.meta;
        const query = action.meta.key || action.meta.query;
        const status = state.status[entityName][query];

        status[type] = { isProcessing: false, error: null };

        if (type === 'update') {
            const { entities } = action.payload.data;

            const prev = state.data[entityName][query];
            const next = entities[entityName][query];

            updateRelations(state, entityName, prev, next);
        }

        if (action.payload.data) {
            const { entities, result } = action.payload.data;

            status[type].result = result;

            for (let name in entities) {
                state.data[name] = {
                    ...state.data[name],
                    ...entities[name],
                };
            }
        }
    },
    prepare: (entityName, request, result) => {
        const schema = Model.getEntitySchema(
            entityName,
            request.isMultiple,
        );

        const data = result?.data
            ? normalize(result.data, schema)
            : null;

        return {
            meta: { ...request, entityName },
            payload: { ...result, data },
        };
    },
};

const apiError = {
    reducer: (state, action) => {
        const { entityName, type } = action.meta;
        const { error } = action;
        const query = action.meta.key || action.meta.query;

        state.status[entityName][query][type] = {
            isProcessing: false,
            error,
        };
    },
    prepare: (entityName, request, error) => ({
        error,
        meta: { ...request, entityName },
    }),
};

function updateRelations(state, entityName, prevData, nextData) {
    const model = Model.findModel(entityName);
    const relations = model.getRelations();
    const entityId = prevData.id;

    relations.forEach((relation) => {
        const { key, selfKey, model } = relation;
        const prev = prevData[key],
            next = nextData[key];

        //Update related entities
        if (selfKey) {
            let toDetach, toAttach;

            if (relation.many) {
                toDetach = prev.filter((id) => !next.includes(id));
                toAttach = next.filter((id) => !prev.includes(id));
            } else {
                toDetach = prev !== next ? [prev] : [];
                toAttach = prev !== next && !!next ? [next] : [];
            }

            toDetach.forEach((detach) => {
                const related = state.data[model.name][detach];

                if (related) {
                    related[selfKey] = relation.selfMany
                        ? related[selfKey].filter(
                              (id) => id !== entityId,
                          )
                        : null;
                }
            });

            toAttach.forEach((attach) => {
                const related = state.data[model.name][attach];

                related[selfKey] = relation.selfMany
                    ? (related[selfKey] || []).concat([entityId])
                    : entityId;
            });
        }

        //Update status if it is entities tree
        if (!relation.many && relation.isTree && prev != next) {
            const root = state.status[entityName].root;

            if (root) {
                if (prev) {
                    root.result.push(entityId);
                }

                if (next) {
                    root.result = root.result.filter(
                        (rId) => rId !== entityId,
                    );
                }
            }
        }
    });
}

const { actions, reducer } = createSlice({
    name: 'entity',
    initialState,
    reducers: {
        apiSuccess,
        apiRequest,
        apiError,
    },
});

export { reducer, actions };
