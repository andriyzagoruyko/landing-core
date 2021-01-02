import React, { useCallback, useMemo } from 'react';
import constants from './constants';
import EntityListContainer from '~/hocs/Containers/EntityList';
import EntityList from '~c/common/List';

const CategoriesList = (props) => {
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
    } = props;


    return (
        <EntityList
            checkbox
            entityName="category"
            entities={entities}
            status={status}
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
            
            tableProps={{ columns: constants.table }}
        />
    );
}

export default EntityListContainer(constants.settings)(CategoriesList);
