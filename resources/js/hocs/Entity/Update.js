import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Actions */
import actions from '~s/ducks/entity/operations';

const Container = (WrappedComponent) => (props) => {
    return <WrappedComponent isEdit={Boolean(props.entity)} {...props} />
}

const mapDispatchToProps = (dispatch, props) => ({
    updateEntity: (data) => dispatch(actions.updateEntity(props.entityName, props.query, data)),
});

export default WrappedComponent => (
    connect(null, mapDispatchToProps)(Container(WrappedComponent))
);
