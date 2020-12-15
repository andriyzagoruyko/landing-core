import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux'

import {
    removeProducts,
    changePage, selectProducts,
    initializeProducts,
    makeSearch,
    submitFilters,
    setProductsSearch,
    setProductsFilters,
    setProductsViewType,
} from '~s/actionCreators/products'
import { filterStructure, perPageOptions } from './constants'
import queryStringConfig from '~/constants/queryStringConfig'
import { Container, Paper } from '@material-ui/core';
import Pagination from '~c/common/Pagination/';
import Page404 from '~p/errors/e404';
import Toolbar from './Toolbar/';
import ProductsLayout from './Layout'

const queryString = require('query-string');

const ProductsList = (props) => {
    const {
        viewType,
        isLoading,
        isError,
        isInitialized,
        lastQueryParams,
        total,
        maxPages,
        items,
        selected,
        searchKeyword,
        filters,
        history,
        initializeProducts,
        removeProducts,
        selectProducts,
        setProductsSearch,
        changePage,
        makeSearch,
        submitFilters,
        setProductsFilters,
        setProductsViewType,
    } = props;

    const selectedCount = Object.values(selected).filter(value => value).length;
    const queryParams = history.location.search;
    const { page = 1, limit = perPageOptions[0], search = '', ...filterParams
    } = queryString.parse(queryParams, queryStringConfig);

    useLayoutEffect(() => {
        const { action } = history;

        if ((!isInitialized && action != 'REPLACE') || action === 'PUSH') {
            initializeProducts(queryParams, search, filterParams, filterStructure);
        }
    }, [history.location]);

    if (isError || !perPageOptions.includes(limit)) {
        return <Page404 />
    }
    const handleChangeViewType = (viewType) => setProductsViewType(viewType);

    const handleChangePage = (e, newPage) => changePage(newPage, limit);
    const handleChangePerPage = value => changePage(1, parseInt(value, 10));

    const handleRemoveSelected = () => removeProducts(items.filter(i => selected[i.id]).map(i => i.id));

    const handleChangeSearch = (search) => setProductsSearch(search);
    const handleSearch = () => makeSearch();

    const handleChangeFilter = filters => setProductsFilters(filters);
    const handleSubmitFilter = filters => submitFilters(filters);

    return (
        <>
            <Container component={Paper} style={{ padding: 0 }} maxWidth={false} >
                <Toolbar
                    selectedCount={selectedCount}
                    onRemove={handleRemoveSelected}
                    onReset={() => selectProducts()}
                    total={total}
                    page={page}
                    maxPages={maxPages}
                    view={viewType}
                    onChangeView={(viewType) => handleChangeViewType(viewType)}
                    searchProps={{
                        value: searchKeyword,
                        active: search.length > 0,
                        onChange: handleChangeSearch,
                        onSearch: handleSearch,
                    }}
                    filterProps={{
                        filters,
                        onChange: (filters) => handleChangeFilter(filters),
                        onSubmit: handleSubmitFilter
                    }}
                />

                <ProductsLayout
                    view={viewType}
                    items={items}
                    perPage={limit}
                    selectedItems={selected}
                    selectedCount={selectedCount}
                    onSelect={selectProducts}
                    onSelectAll={selectProducts}
                    searchActive={search.length > 0}
                    isLoading={isLoading}
                    aria-label="products table"
                />
            </Container>
            {
                (items.length > 0) && (
                    <Pagination
                        maxPages={maxPages}
                        siblingCount={1}
                        page={page}
                        perPage={limit}
                        perPageOptions={perPageOptions}
                        routeName={'products'}
                        variant="outlined"
                        onChangePage={handleChangePage}
                        onChangePerPage={(e) => handleChangePerPage(e.target.value)}
                    />
                )
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.app.isLoading,
        viewType: state.products.viewType,
        isInitialized: state.products.isInitialized,
        isError: state.products.isError,
        total: state.products.total,
        lastQueryParams: state.products.lastQueryParams,
        items: state.products.items,
        maxPages: state.products.maxPages,
        selected: state.products.selected,
        searchKeyword: state.products.searchKeyword,
        filters: state.products.filters
    }
}

export default connect(mapStateToProps, {
    initializeProducts, removeProducts, selectProducts, changePage, makeSearch, submitFilters, setProductsSearch, setProductsFilters, setProductsViewType
})(ProductsList);