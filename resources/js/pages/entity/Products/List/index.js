import React, { useCallback, useMemo } from 'react';
import Table from '~c/common/Table'
import Grid from '~c/entity/ListPage/Grid/'
import ActionButtons from '~c/entity/ListPage/ActionButtons'
import Aviability from './Aviability'
import Card from './Card'
import tableCreator from './table';

const ListLayout = ({ viewType, selected, entities, onSelect, onMultipleSelect, baseRoute, onRemove }) => {
    const renderAviability = useCallback(available => (
        <Aviability variant="outlined" available={available} />
    ), [entities]);

    const renderActions = useCallback(id => (
        <ActionButtons id={id} baseRoute={baseRoute} onRemove={onRemove} edit remove />
    ), [entities]);

    const renderCard = useCallback(item => (
        <Card
            key={item.id}
            checked={selected.includes(item.id) || false}
            onSelect={() => onSelect(item.id)}
            renderActionButtons={renderActions}
            {...item}
        />
    ), [entities, selected]);

    const columns = useMemo(() => tableCreator(renderAviability, renderActions), [entities]);

    switch (viewType) {
        case 'grid':
            return <Grid items={entities} renderCard={renderCard} />

        case 'table':
            return (
                <Table
                    checkbox
                    columns={columns}
                    aria-label="products table"
                    rows={entities}
                    selected={selected}
                    onSelect={onSelect}
                    onSelectAll={onMultipleSelect}
                />
            );
    }

    return null;
}

export default React.memo(ListLayout);
