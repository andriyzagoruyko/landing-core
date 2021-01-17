import React from 'react';
import { Section, Field, Upload } from '~c/common/Form/';
import SelectCategories from '~c/entity/FormPage/SelectCategories/';

const CategoryForm = ({ entity }) => {
    return (
        <>
            <Section title="General" divider>
                <Field name="title" label="Category name" grow />
                <Section dense>
                    <SelectCategories
                        name="parent_id"
                        label="Category parrent"
                        except={entity ? entity.id : null}
                    />
                </Section>
            </Section>

            <Section title="Images" divider>
                <Upload name="images" filesLimit={1} />
            </Section>

            <Section title="Description">
                <Field name="description" label="Category description" multiline fullWidth rows={8} />
            </Section>
        </>
    );
}

export default CategoryForm;
