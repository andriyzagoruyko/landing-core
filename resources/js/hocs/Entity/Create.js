import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

/* Actions */
import actions from '~s/ducks/entity/operations';

const Container = (WrappedComponent) => (props) => {
    return <WrappedComponent {...props} />
}

const UuidContainer = (WrappedComponent) => (props) => {
    const [uuid, setUuid] = useState();

    const refreshUuid = () => {
        const newUuid = Date.now();
        setUuid(newUuid);
        return newUuid;
    }

    useEffect(() => {
        refreshUuid();
    }, []);

    return <WrappedComponent uuid={uuid} refreshUuid={refreshUuid} {...props} />
}

const mapDispatchToProps = (dispatch, props) => ({
    createEntity: (data) => {
        dispatch(actions.createEntity(props.entityName, props.refreshUuid(), data));
    },
});

export default WrappedComponent => compose(
    UuidContainer,
    Container,
    connect(null, mapDispatchToProps),
)(WrappedComponent);;
