import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Actions */
import actions from '~s/modules/entity/thunks';

/* Selectors */
import selectors from '~s/modules/entity/selectors';

const Container = (WrappedComponent) => ({ shouldRead, ...props }) => {
    const { query, readEntity } = props;

    useEffect(() => {
        shouldRead && readEntity(query);
    }, []);

    return <WrappedComponent initialValues={props.entity} {...props} />
}

const mapStateToProps = (state, { entityName, query, collection, uuid }) => {
    const entity = collection
        ? selectors.getCollection(state, entityName, query)
        : selectors.getEntity(state, entityName, query)

    const status = selectors.getStatus(state, entityName, query || uuid);
    const error = status.error;
    const shouldRead = query && ((!collection && !entity) || (collection && !entity.length));

    return {
        entity,
        status,
        error,
        shouldRead,
        getCollectionByArray: (ids) => selectors.getCollectionByArray(state, entityName, ids)
    }
}

const mapDispatchToProps = (dispatch, { entityName, query, collection }) => ({
    readEntity: () => dispatch(actions.readEntities(entityName, query, collection)),
});

export default WrappedComponent => (
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Container(WrappedComponent))
);
