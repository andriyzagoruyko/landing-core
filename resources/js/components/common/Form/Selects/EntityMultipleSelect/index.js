import React from 'react';
import Read from '~/hocs/Entity/Read'
import MultipleSelectChip from '../MultipleSelectChip';

const EnhancedMultipleSelect = Read(({ selectProps, entity }) => {
    return <MultipleSelectChip items={entity} {...selectProps} />
});

const EntityMultipleSelect = ({ entityName, selectProps, ...props }) => (
    <EnhancedMultipleSelect
        multiple
        entityName={entityName}
        query={"limit=12&page=1"}
        selectProps={selectProps}
    />
);

export default EntityMultipleSelect;

