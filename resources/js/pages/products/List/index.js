import React, { useCallback, useMemo } from 'react';
import { filterStructure, tableStructure, perPageOptions } from './constants'
import EntityCollectionPage from '~/hocs/EntityCollectionPage';
import PageList from '~c/common/List'
import useTitle from '~/hooks/useTitle';
import ActionsButtons from '~c/common/List/ActionsButtons'
import ProductCard from './Card'

const ProductsList = (props) => {
    const {
        searchKeyword,
        isSearchActive,
        filters,
        viewType,
        entities,
        status,
        changePage,
        setViewType,
        page,
        limit,
        total,
        selected,
        maxPages,
        setSearchKeyword,
        setFilters,
        confirmFilters,
        removeEntitiesFromPage,
        selectEntity,
        selectMultiple,
    } = props;

    useTitle(props.title);

    const renderActionButtons = useCallback(id => {
        return <ActionsButtons
            onRemove={() => removeEntitiesFromPage([id])}
            onEdit={() => { }}
        />
    }, [entities]);

    const renderCard = useCallback(item => (
        <ProductCard
            key={item.id}
            checked={selected.includes(item.id) || false}
            onSelect={() => selectEntity(item.id)}
            renderActionButtons={renderActionButtons}
            {...item}
        />
    ), [entities, selected]);

    const tableColumns = useMemo(() => tableStructure(renderActionButtons), [entities]);

    return (
        <PageList
            checkbox
            entityName="products"
            entities={entities}
            status={status}
            viewType={viewType}
            page={page}
            limit={limit}
            total={total}
            maxPages={maxPages}
            selected={selected}
            isSearchActive={isSearchActive}
            onSelect={selectEntity}
            onMultipleSelect={() => selectMultiple(entities.map(e => e.id))}
            toolbarProps={{
                onChangeView: setViewType,
                onRemoveSelected: () => removeEntitiesFromPage(selected),
                onResetSelected: () => selectMultiple([]),
            }}
            searchProps={{
                value: searchKeyword,
                active: isSearchActive,
                onChange: setSearchKeyword,
                onSearch: confirmFilters,
            }}
            filterProps={{
                filters,
                onChange: setFilters,
                onSubmit: confirmFilters
            }}
            paginationProps={{
                perPageOptions: perPageOptions,
                onChangePage: (e, newPage) => changePage(newPage, limit),
                onChangePerPage: (e) => changePage(1, parseInt(e.target.value, 10)),
            }}
            tableProps={{ columns: tableColumns }}
            gridProps={{ renderCard }}
        />
    );
}

export default EntityCollectionPage({
    entityName: 'product',
    perPageOptions,
    filterStructure,
    initialParams: {
        page: 1,
        limit: perPageOptions[0]
    },
    restoreOnBack: true,
    restoreAlways: ['limit']
})(ProductsList);
