import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import {
    removeProducts,
    changePage, selectProducts,
    initializeProducts,
    submitSearch,
    submitFilters,
    setProductsSearch,
    setProductsFilters,
    setProductsViewType,
} from '~s/actionCreators/products'
import { filterStructure, tableStructure, perPageOptions } from './constants'
import { parseQuery } from '~/helpers/query'
import { Container, Paper } from '@material-ui/core';
import WithTitle from "~/hocs/WithTitle"
import Pagination from '~c/common/Pagination/';
import Page404 from '~p/errors/e404';
import Toolbar from './Toolbar/';
import ProductsLayout from './Layout'

const ProductsList = (props) => {
    const {
        viewType,
        isError,
        isFetching,
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
        changePage,
        submitSearch,
        submitFilters,
        setProductsSearch,
        setProductsFilters,
        setProductsViewType,
    } = props;

    const selectedCount = Object.values(selected).filter(value => value).length;
    const locationSearch = history.location.search || lastQueryParams;
    const {
        page = 1,
        limit = perPageOptions[0],
        search = '',
        ...filterParams
    } = parseQuery(locationSearch);
    const isSearchActive = search.length > 0;

    useEffect(() => {
        if (history.action === 'PUSH' || (!isInitialized && history.action === 'POP')) {
            initializeProducts(locationSearch, search, filterParams, filterStructure);
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
    const handleSearch = () => submitSearch();

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
                        active: isSearchActive,
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
                    columns={tableStructure}
                    selectedItems={selected}
                    selectedCount={selectedCount}
                    onSelect={selectProducts}
                    onSelectAll={selectProducts}
                    searchActive={isSearchActive}
                    isLoading={isFetching}
                />
            </Container>
            {(items.length > 0) && (
                <Pagination
                    disabled={isFetching}
                    maxPages={maxPages}
                    siblingCount={1}
                    page={page}
                    perPage={limit}
                    perPageOptions={perPageOptions}
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
        viewType: state.products.viewType,
        isInitialized: state.products.isInitialized,
        isError: state.products.isError,
        isFetching: state.products.isFetching,
        total: state.products.total,
        lastQueryParams: state.products.lastQueryParams,
        items: state.products.items,
        maxPages: state.products.maxPages,
        selected: state.products.selected,
        searchKeyword: state.products.searchKeyword,
        filters: state.products.filters
    }
}

const ConnectedProductsList = connect(mapStateToProps, {
    initializeProducts, removeProducts, selectProducts, 
    changePage, submitSearch, submitFilters, 
    setProductsSearch, setProductsFilters, setProductsViewType
})(ProductsList);

export default WithTitle(ConnectedProductsList);
