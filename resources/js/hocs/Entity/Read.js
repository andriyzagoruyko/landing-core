import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Actions */
import actions from '~s/ducks/entity/operations';

/* Selectors */
import selectors from '~s/ducks/entity/selectors';

const Container = (WrappedComponent) => ({ shouldRead, ...props }) => {
    const { query, readEntity } = props;

    useEffect(() => {
        shouldRead && readEntity(query);
    }, []);

    return <WrappedComponent {...props} />
}

const mapStateToProps = (state, { entityName, query, multiple, uuid }) => {
    const entity = multiple
        ? selectors.getCollection(state, entityName, query)
        : selectors.getEntity(state, entityName, query)

    const status = selectors.getStatus(state, entityName, query || uuid);
    const isError = Boolean(status.error);
    const shouldRead = query && ((!multiple && !entity) || (multiple && !entity.length));

    return { entity, status, isError, shouldRead }
}

const mapDispatchToProps = (dispatch, { entityName, query, multiple }) => ({
    readEntity: () => dispatch(actions.readEntities(entityName, query, multiple)),
});

export default WrappedComponent => (
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Container(WrappedComponent))
);
