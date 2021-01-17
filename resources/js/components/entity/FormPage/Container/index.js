
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

const EntityFormContainer = params => WrappedComponent => compose(
    connect(() => ({ ...params })),
    reduxForm({
        form: params.entityName,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate: params.validate
    }),
)(WrappedComponent);

export default EntityFormContainer;