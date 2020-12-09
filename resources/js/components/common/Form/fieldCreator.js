import React from 'react';
import Field from './Field';
import CheckboxField from './CheckboxField';
import Button from './Button';

const fieldCreator = (variant, props) => {
    switch (variant) {
        case 'field':
            return <Field {...props} />

        case 'checkboxHiddenField':
            return <CheckboxField  {...props} />

        case 'button':
            return <Button  {...props} />

        default: return null;
    }
}

const makeFields = (fields) => fields.map(({ variant, ...props }, index) => (
    fieldCreator(variant, { ...props, key: index })
));

export default fieldCreator;
export { makeFields, fieldCreator }