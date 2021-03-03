import React, { useCallback } from 'react';
import { Field } from 'redux-form';
import Select from './Select';
import useCollection from '~/hooks/useCollection';

const EnhancedSelect = ({ input, label, except, multiple }) => {
    const selected = Array.isArray(input.value)
        ? input.value
        : [input.value].filter(Boolean);

    const { entities, byArray } = useCollection(
        'category',
        'root',
        selected,
    );

    return (
        <Select
            label={label}
            emptyText={'Without category'}
            items={entities}
            selectedItems={byArray}
            selected={selected}
            except={except}
            onChange={input.onChange}
            multiple={multiple}
        />
    );
};

const CategoriesSelect = ({ label, name, except, multiple }) => (
    <Field
        label={label}
        name={name}
        component={useCallback(
            (props) => (
                <EnhancedSelect
                    collection
                    entityName="category"
                    query="root"
                    except={except}
                    multiple={multiple}
                    {...props}
                />
            ),
            [except],
        )}
    />
);

export default CategoriesSelect;
