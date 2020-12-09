import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux'
import {
    removeProducts,
    changePage, selectProducts,
    initializeProducts,
    makeSearch,
    setProductsSearch,
    setProductsFilters,
    submitFilters,
} from '~s/actionCreators/products'
import { urlBuilder } from '~/routes';
import { Container, Paper } from '@material-ui/core';
import Link from '~c/common/Link'
import Table from '~c/common/Table'
import Toolbar from '~c/common/Table/Toolbar/';
import { Filter, initializeFilter } from '~c/common/Filter';
import Search from '~c/common/Search/';
import Pagination from '~c/common/Pagination/';
import Page404 from '~p/errors/e404';
import { tableStructure, filterStructure, perPageOptions } from './constants'
import queryStringConfig from '~/constants/queryStringConfig'

const queryString = require('query-string');

const ProductsList = (props) => {
    const {
        isLoading,
        isError,
        isInitialized,
        maxPages,
        items,
        selected,
        search,
        filters,
        history,
        initializeProducts,
        removeProducts,
        selectProducts,
        setProductsSearch,
        changePage,
        makeSearch,
        setProductsFilters,
        submitFilters
    } = props;

    const {
        page: queryPage = 1,
        limit: queryLimit = perPageOptions[0],
        search: querySearch = '',
        ...filterQuery
    } = queryString.parse(history.location.search, queryStringConfig);

    const selectedCount = Object.values(selected).filter(value => value).length;

    useLayoutEffect(() => {
        if (history.action != 'REPLACE' && !isInitialized) {
            setProductsSearch(querySearch);
            setProductsFilters(initializeFilter(filterStructure, filterQuery));
            initializeProducts(history.location.search);
        }
    }, [history.location]);

    if (isError) {
        return <Page404 />
    }

    const handleChangePage = (e, newPage) => changePage(newPage, queryLimit);
    const handleChangePerPage = value => changePage(1, parseInt(value, 10));

    const handleSelect = ids => selectProducts(ids);
    const handleRemoveSelected = () => removeProducts(items.filter(i => selected[i.id]).map(i => i.id));

    const handleChangeSearch = (search) => setProductsSearch(search);
    const handleSearch = () => makeSearch();

    const handleChangeFilter = filters => setProductsFilters(filters);
    const handleSubmitFilter = filters => {
        setProductsFilters(filters)
        submitFilters();
    };

    const noProducts = querySearch.length
        ? 'No results found.'
        : (
            <>
                No products has been added.&nbsp;
                <Link to={urlBuilder('productsAdd')}>Click to add</Link>
            </>
        );

    return (
        <>
            <Container component={Paper} style={{ padding: 0 }} maxWidth={false}>
                <Toolbar
                    selectedCount={selectedCount}
                    onRemove={handleRemoveSelected}
                >
                    <Search
                        show
                        value={search}
                        active={querySearch.length > 0}
                        placeholder="Search by name and article"
                        onChange={handleChangeSearch}
                        onSearch={handleSearch}
                    />
                    <Filter
                        show
                        filterStructure={filterStructure}
                        filters={filters}
                        onChange={(filters) => handleChangeFilter(filters)}
                        onSubmit={handleSubmitFilter}
                    />
                </Toolbar>
                <Table
                    columns={tableStructure}
                    rows={items}
                    perPage={queryLimit}
                    checkbox
                    selectedRows={selected}
                    selectedCount={selectedCount}
                    onSelect={handleSelect}
                    onSelectAll={() => handleSelect(null)}
                    emptyText={isLoading ? 'Loading...' : noProducts}
                    aria-label="products table"
                />
            </Container>

            {(items.length > 0) && (
                <Pagination
                    maxPages={maxPages}
                    siblingCount={1}
                    page={queryPage}
                    perPage={queryLimit}
                    perPageOptions={perPageOptions}
                    routeName={'products'}
                    variant="outlined"
                    onChangePage={handleChangePage}
                    onChangePerPage={(e) => handleChangePerPage(e.target.value)}
                />
            )}
        </>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.app.isLoading,
        isInitialized: state.products.isInitialized,
        isError: state.products.isError,
        items: state.products.items,
        maxPages: state.products.maxPages,
        selected: state.products.selected,
        search: state.products.search,
        filters: state.products.filters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initializeProducts: (params) => dispatch(initializeProducts(params)),
        removeProducts: (ids) => dispatch(removeProducts(ids)),
        selectProducts: (ids) => dispatch(selectProducts(ids)),
        changePage: (page, perPage) => dispatch(changePage(page, perPage)),
        makeSearch: () => dispatch(makeSearch()),
        submitFilters: () => dispatch(submitFilters()),
        setProductsSearch: (search) => dispatch(setProductsSearch(search)),
        setProductsFilters: (filters) => dispatch(setProductsFilters(filters)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);