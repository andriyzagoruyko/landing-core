import React from 'react';
import { reduxForm } from 'redux-form';
import validate from './validation';
import FormContainer from '~/hocs/Containers/EntityForm'
import { Form, Section, Field, CheckboxField, EntityMultipleSelect, Upload, Button } from '~c/common/Form/';

const ProductForm = ({ isEdit, onSubmit, handleSubmit }) => (
    <Form onSubmit={handleSubmit(onSubmit)} >
        <Section title="General" divider>
            <Field name="title" label="Product name" />
            <Field name="article" label="Product article" />
            <Section dense>
                <EntityMultipleSelect
                    entityName="category"
                    selectProps={{
                        name: "categoriesIds",
                        label: "Product categories",
                        emptyText: "Without category",
                    }}
                />
            </Section>
        </Section>

        <Section title="Selling" divider>
            <Field name="price" label="Product price" type="number" grow={false} />
            <Field name="available" label="Availability (optional)" type="number" grow={false} />
            <CheckboxField name="saleEnabled" label="With sale" type="number" grow={false} >
                <Field name="sale" label="Sale in %" type="number" />
                <Field name="saleExpires" label="Sale expires at (optional)" type="datetime-local" InputLabelProps={{ shrink: true }} />
            </CheckboxField >
        </Section>

        <Section title="Images" divider>
            <Upload
                name="images"
                filesLimit={5}
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop an image here or click"}
            />
        </Section>

        <Section title="Description">
            <Field name="description" label="Product description" multiline fullWidth rows={8} />
        </Section>

        <Section >
            <Button variant="contained" color="primary" type="submit">
                {isEdit ? "Save product" : "Add product"}
            </Button>
        </Section>
    </Form>
);

const ProductFormPage = (props) => (
    <FormContainer
        entityName="product"
        component={reduxForm({ form: 'product', enableReinitialize: true, validate })(ProductForm)}
        {...props}
    />
)

export default ProductFormPage;
