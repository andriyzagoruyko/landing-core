import React from 'react';
import PropTypes from 'prop-types';
import Table from '~c/common/Table'
import ProductsGrid from './Grid'
import EmptyText from '~c/common/List/EmptyText'

const Products = (props) => {
    const {
        view,
        columns,
        items,
        selectedItems,
        selectedCount,
        onSelect,
        onSelectAll,
        searchActive,
        isLoading
    } = props;

    if (!items.length) {
        return (
            <EmptyText>
                {isLoading
                    ? "Loading..."
                    : searchActive
                        ? "No results found"
                        : "No products has been added"
                }
            </EmptyText>
        );
    }

    return (
        view === 'table'
            ? (
                <Table
                    checkbox
                    aria-label="products table"
                    columns={columns}
                    rows={items}
                    selectedRows={selectedItems}
                    selectedCount={selectedCount}
                    onSelect={onSelect}
                    onSelectAll={() => onSelectAll(null)}
                />
            )
            : (
                <ProductsGrid
                    items={items}
                    selectedItems={selectedItems}
                    onSelect={onSelect}
                />
            )
    )
};

Products.propTypes = {
    view: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    selectedItems: PropTypes.object.isRequired,
    selectedCount: PropTypes.number.isRequired,
    searchActive: PropTypes.bool,
    isLoading: PropTypes.bool,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
};

Products.defaultProps = {
    onSelect: () => { },
    onSelectAll: () => { },
};


export default React.memo(Products);

