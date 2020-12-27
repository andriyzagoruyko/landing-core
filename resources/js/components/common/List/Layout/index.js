import React from 'react';
import EmptyText from '~c/common/List/EmptyText'
import Table from '~c/common/Table'
import Grid from '~c/common/List/Grid/'

const ListLayout = (props) => {
    const {
        viewType,
        checkbox,
        selected,
        entities,
        entityName,
        isFetching,
        isSearchActive,
        onSelect,
        onMultipleSelect,
        tableProps,
        gridProps
    } = props;

    if (!entities.length) {
        return (
            <EmptyText>
                {isFetching
                    ? "Loading..."
                    : isSearchActive ? "No results found." : `No ${entityName} has been added.`
                }
            </EmptyText>
        )
    }

    if ((!viewType || viewType === 'table') && tableProps) {
        return (
            <Table
                checkbox={checkbox}
                aria-label="products table"
                rows={entities}
                selected={selected}
                onSelect={onSelect}
                onSelectAll={onMultipleSelect}
                {...tableProps}
            />
        )
    }

    if (viewType === 'grid' && gridProps) {
        return (
            <Grid items={entities} {...gridProps} />
        )
    }

    console.warn('No viewtype specified');
}

export default React.memo(ListLayout);
