import React, { useCallback, useMemo } from 'react';
import { urlBuilder } from '~/routes'
import constants from './constants';
import EntityListContainer from '~/hocs/Containers/EntityList';
import EntityList from '~c/common/List';
import ProductCard from './Card'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
        perPageOptions,
        push
    } = props;

    const renderActionButtons = useCallback(id => {
        return (
            <>
                <IconButton size="small" aria-label="edit" onClick={() => push(urlBuilder('productsEdit', { id }))}>
                    <EditIcon color="primary" />
                </IconButton>
                
                <IconButton size="small" aria-label="edit" onClick={() => removeEntitiesFromPage([id])} >
                    <DeleteIcon color="secondary" />
                </IconButton>
            </>
        );
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

    const tableColumns = useMemo(() => constants.table(renderActionButtons), [entities]);

    return (
        <EntityList
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
                perPageOptions,
                onChangePage: (e, newPage) => changePage(newPage, limit),
                onChangePerPage: (e) => changePage(1, parseInt(e.target.value, 10)),
            }}
            tableProps={{ columns: tableColumns }}
            gridProps={{ renderCard }}
        />
    );
}

export default EntityListContainer(constants.settings)(ProductsList);
