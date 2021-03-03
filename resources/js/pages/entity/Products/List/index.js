import React, { useCallback, useMemo } from 'react';
import EntityList from '~c/entity/ListPage/';
import Table from '~c/common/Table';
import Grid from '~c/entity/ListPage/Grid/';
import ActionButtons from '~c/entity/ListPage/ActionButtons';
import Availability from './Availability';
import Card from './Card';
import tableCreator from './table';
import filterStructure from './filters';
import viewTypes from './viewTypes';

const ListLayout = ({
    viewType,
    selected,
    entities,
    onSelect,
    onMultipleSelect,
    baseRoute,
    onRemove,
}) => {
    const renderAvailability = useCallback(
        (available) => (
            <Availability variant="outlined" available={available} />
        ),
        [entities],
    );

    const renderActions = useCallback(
        (id) => (
            <ActionButtons
                id={id}
                baseRoute={baseRoute}
                onRemove={onRemove}
                edit
                remove
            />
        ),
        [entities],
    );

    const renderCard = useCallback(
        (item) => (
            <Card
                key={item.id}
                checked={selected.includes(item.id) || false}
                onSelect={() => onSelect(item.id)}
                renderActionButtons={renderActions}
                {...item}
            />
        ),
        [entities, selected],
    );

    const columns = useMemo(
        () => tableCreator(renderAvailability, renderActions),
        [entities],
    );

    switch (viewType) {
        case 'grid':
            return <Grid items={entities} renderCard={renderCard} />;

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
};

export const ProductsList = EntityList({
    entityName: 'product',
    searchPlaceholder: 'Search by name and article',
    defaultViewType: 'grid',
    component: ListLayout,
    filterStructure,
    viewTypes,
});

export default ProductsList;
