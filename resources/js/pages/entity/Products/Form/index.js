import React from 'react';
import { Section, Field, CheckboxField, Upload } from '~c/common/Form/';
import TabsContainer from '~c/common/Tabs';
import SelectCategories from '~c/entity/FormPage/SelectCategories/';

const ProductForm = () => {
    return (
        <TabsContainer tabs={['Common', 'Description']}>
            <>
                <Section divider>
                    <Field name="title" label="Product name" grow />
                    <Field name="article" label="Product article" grow />
                    <Section dense>
                        <SelectCategories name="categories" label="Product categories" multiple/>
                    </Section>
                </Section>
                <Section title="Selling">
                    <Field name="price" label="Product price" type="number" />
                    <Field name="available" label="Availability (optional)" type="number" />
                    <CheckboxField name="saleEnabled" label="With sale" type="number" >
                        <Field name="sale" label="Sale in %" type="number" />
                        <Field name="saleExpires" label="Sale expires at (optional)" type="datetime-local" InputLabelProps={{ shrink: true }} />
                    </CheckboxField >
                </Section>
            </>
            <>
                <Section>
                    <Field name="description" label="Product description" multiline fullWidth rows={8} />
                    <Upload name="images" filesLimit={5} previewText="" />
                </Section>
            </>
        </TabsContainer>
    )
}

export default ProductForm;
