import React, { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { ucFirst } from '~/helpers/';
import noties from '~s/ducks/notifier/actions';
import useTitle from '~/hooks/useTitle';
import withWrite from '~/hocs/entity/crud/withWrite';
import withRead from '~/hocs/entity/crud/withRead';
import withError from '~/hocs/entity/withError';
import Loader from '~c/common/Preloader';

import { Form, Section, Button } from '~c/common/Form/';

const enhance = compose(
    withWrite,
    withRead,
    withError,
);

let EnhancedForm = enhance(({
    title,
    updateOrCreateEntity,
    component: Layout,
    initialize,
    handleSubmit,
    ...props
}) => {
    const {
        entity,
        status,
        entityName
    } = props;

    const dispatch = useDispatch();
    const enqueueSnackbar = (...args) => dispatch(noties.enqueueSnackbar(...args));

    useTitle(title);

    useEffect(() => {
        initialize(entity)
    }, [entity])

    const onSubmit = async data => {
        await updateOrCreateEntity(data);

        enqueueSnackbar({
            message: `${ucFirst(entityName)} ${props.isEdit ? 'updated' : 'created'} successfully`,
            options: { variant: 'success' },
        });
    }

    return (
        <>
            {status.isFetching && <Loader />}
            <Form onSubmit={handleSubmit(onSubmit)} >
                <Layout {...props} />
                <Section>
                    <Button variant="contained" color="primary" type="submit">
                        {`${props.isEdit ? 'Save' : 'Add'} ${entityName}`}
                    </Button>
                </Section>
            </Form>
        </>
    );
});

const EntityFormPage = props => <EnhancedForm query={parseInt(props.match.params.id)} {...props} />

export default EntityFormPage;