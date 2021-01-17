import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getRandomKey } from '~/helpers/';

/* Actions */
import actions from '~s/ducks/entity/thunks';

const Container = (WrappedComponent) => (props) => {
    return <WrappedComponent {...props} />
}

const UuidContainer = (WrappedComponent) => (props) => {
    const [uuid, setUuid] = useState();

    const refreshUuid = () => {
        const newUuid = getRandomKey();
        setUuid(newUuid);
        return newUuid;
    }

    useEffect(() => {
        refreshUuid();
    }, []);

    return (
        <WrappedComponent isEdit={Boolean(props.query)} uuid={uuid} refreshUuid={refreshUuid}  {...props} />
    );
}

const mapDispatchToProps = (dispatch, props) => ({
    createEntity: (data) => dispatch(actions.createEntity(props.entityName, props.refreshUuid(), data)),
    updateEntity: (data) => dispatch(actions.updateEntity(props.entityName, props.query, data)),
    updateOrCreateEntity: (data) => dispatch(actions.updateOrCreateEntity(props.entityName, data, props.refreshUuid())),
});

export default WrappedComponent => compose(
    UuidContainer,
    Container,
    connect(null, mapDispatchToProps),
)(WrappedComponent);;
