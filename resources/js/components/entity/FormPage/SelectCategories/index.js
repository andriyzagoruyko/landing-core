import React, { useCallback } from 'react';
import withRead from '~/hocs/entity/crud/withRead'
import { Field } from 'redux-form'
import Select from './Select';

const EnhancedSelect = withRead(({ input, label, entity, except, multiple, getCollectionByArray }) => {
    let selected = [];

    if (input.value) {
        selected = Array.isArray(input.value) ? input.value : [input.value];
    }

    return (
        <Select
            label={label}
            emptyText={"Without category"}
            items={entity}
            selectedItems={selected.length ? getCollectionByArray(selected) : []}
            selected={selected}
            except={except}
            onChange={input.onChange}
            multiple={multiple}
        />
    )
});

const CategoriesSelect = ({ label, name, except, multiple }) => (
    <Field
        label={label}
        name={name}
        component={useCallback(props => (
            <EnhancedSelect collection entityName="category" query="root" except={except} multiple={multiple} {...props} />
        ), [except])}
    />
);

export default CategoriesSelect;

