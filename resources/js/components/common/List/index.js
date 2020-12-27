import React from 'react';
import { Container, Paper } from '@material-ui/core';
import Pagination from '~c/common/Pagination/';
import Toolbar from '~c/common/List/Toolbar/';
import Layout from '~c/common/List/Layout'

const PageList = (props) => {
    const {
        entityName,
        entities,
        status,
        page,
        limit,
        total,
        maxPages,
        viewType,
        isSearchActive,
        toolbarProps,
        paginationProps,
        filterProps,
        searchProps,
        selected,
        onSelect,
        onMultipleSelect,
        checkbox,
        gridProps,
        tableProps
    } = props;

    return (
        <>
            <Container component={Paper} style={{ padding: 0 }} maxWidth={false} >
                <Toolbar
                    selectedCount={selected.length}
                    total={total}
                    page={page}
                    maxPages={maxPages}
                    onRemove={toolbarProps.onRemoveSelected}
                    onReset={toolbarProps.onResetSelected}
                    view={viewType}
                    onChangeView={toolbarProps.onChangeView}
                    searchProps={searchProps}
                    filterProps={filterProps}
                />
                <Layout
                    checkbox={checkbox}
                    entityName={entityName}
                    selected={selected}
                    entities={entities}
                    viewType={viewType}
                    isFetching={status.isFetching}
                    isSearchActive={isSearchActive}
                    onSelect={onSelect}
                    onMultipleSelect={onMultipleSelect}
                    tableProps={tableProps}
                    gridProps={gridProps}
                />
            </Container>

            {entities.length > 0 && (
                <Pagination
                    disabled={status.isFetching}
                    maxPages={maxPages}
                    siblingCount={1}
                    page={page}
                    perPage={limit}
                    variant="outlined"
                    {...paginationProps}
                />
            )}
        </>
    )
}

export default PageList;
