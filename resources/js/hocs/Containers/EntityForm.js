import React from 'react';
import { compose } from 'redux';
import useTitle from '~/hooks/useTitle';
import EntityCreate from '~/hocs/Entity/Create'
import EntityRead from '~/hocs/Entity/Read'
import EntityUpdate from '~/hocs/Entity/Update'
import ErrorPage from '~/hocs/Page/Error'
import Loader from '~c/Preloader';

const enhance = compose(
    EntityCreate,
    EntityRead,
    EntityUpdate,
    ErrorPage
);

const EnhancedForm = enhance(({ title, entity, status, createEntity, updateEntity, component: Component, ...props }) => {
    useTitle(title);

    const handleSubmit = data => props.isEdit
        ? updateEntity(data)
        : createEntity(data);

    return (
        <>
            {status.isFetching && <Loader />}
            <Component
                initialValues={entity}
                onSubmit={handleSubmit}
                {...props}
            />
        </>
    );
});

const FormContainer = props => (
    <EnhancedForm query={parseInt(props.match.params.id)} {...props} />
)

export default FormContainer;
