import React, { useEffect } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { ucFirst } from '~/helpers/';
import { actions as noties } from '~s/modules/notifier/';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Form, Section, Button } from '~c/common/Form/';
import { generatePath, useParams } from 'react-router-dom';
import useEntity from '~/hooks/useEntity';
import useTitle from '~/hooks/useTitle';
import { getEntityRoute } from '~/routes/entities';
import ErrorHandler from '~/components/common/ErrorHandler/index';

const EntityForm = ({
    component: Layout,
    initialize,
    handleSubmit,
    entityName,
    title,
    ...props
}) => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const { entity, status, updateOrCreate } = useEntity(
        entityName,
        id,
    );

    const isEdit = !!id;
    const isProcessing =
        status?.get?.isProcessing ||
        status?.update?.isProcessing ||
        status?.create?.isProcessing;

    useTitle(title);

    useEffect(() => {
        initialize(entity);
    }, [entity]);

    const onSubmit = async (data) => {
        const res = await updateOrCreate(data);

        const message = `${ucFirst(entityName)} ${
            isEdit ? 'updated' : 'created'
        } successfully`;

        dispatch(
            noties.enqueueSnackbar({
                message,
                options: { variant: 'success' },
            }),
        );

        if (!isEdit) {
            const route = getEntityRoute(entityName, 'edit');
            dispatch(
                push(generatePath(route.path, { id: res.data.id })),
            );
        }
    };

    return (
        <ErrorHandler isError={status?.get?.error}>
            {isProcessing && <LinearProgress />}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Layout {...props} entity={entity} isEdit={isEdit} />
                <Section>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isProcessing}
                    >
                        {`${id ? 'Save' : 'Add'} ${entityName}`}
                    </Button>
                </Section>
            </Form>
        </ErrorHandler>
    );
};

const FormPage = ({ validate, ...rest }) =>
    compose(
        (WrappedComponent) => (props) => (
            <WrappedComponent {...props} {...rest} />
        ),
        reduxForm({
            form: rest.entityName,
            enableReinitialize: true,
            keepDirtyOnReinitialize: true,
            validate,
        }),
    )(EntityForm);

export default FormPage;
