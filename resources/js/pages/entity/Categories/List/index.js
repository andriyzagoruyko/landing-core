import React, { useCallback, useMemo } from 'react';
import Table from '~c/common/Table'
import ActionButtons from '~c/entity/ListPage/ActionButtons'
import tableCreator from './table';

const ListLayout = ({ viewType, selected, entities, onSelect, onMultipleSelect, baseRoute, onRemove }) => {
    const renderActions = useCallback(id => (
        <ActionButtons id={id} baseRoute={baseRoute} onRemove={onRemove} edit remove />
    ), [entities]);

    const columns = useMemo(() => tableCreator(renderActions), [entities]);

    switch (viewType) {
        case 'table':
            return (
                <Table
                    checkbox
                    aria-label="categories table"
                    rows={entities}
                    selected={selected}
                    onSelect={onSelect}
                    onSelectAll={onMultipleSelect}
                    columns={columns}
                />
            );
    }

    return null;
}

export default React.memo(ListLayout);
