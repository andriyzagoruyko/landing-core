import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Container,
    Paper,
    Tooltip,
    IconButton,
    Typography,
} from '@material-ui/core';
import EmptyText from '~c/entity/ListPage/EmptyText';
import Pagination from '~c/common/Pagination/';
import Toolbar from '~c/entity/ListPage/Toolbar/';
import ToolbarSection from './Toolbar/Section';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Hoc from './Container/';
import useTitle from '~/hooks/useTitle';

const EntityListPage = (props) => {
    const {
        Layout,
        title,
        entityName,
        perPageOptions,
        searchKeyword,
        isSearchActive,
        searchPlaceholder,
        filters,
        viewType,
        entities,
        status,
        page,
        limit,
        total,
        selected,
        maxPages,
        setViewType,
        setSearchKeyword,
        setFilters,
        confirmFilters,
        changePage,
        removeEntitiesFromPage,
        selectEntity,
        selectMultiple,
        baseRoute,
        viewTypes,
    } = props;

    const location = useLocation();

    useTitle(title);

    const handleMultipleSelect = useCallback(() => {
        selectMultiple(entities.map((e) => e.id));
    }, [entities]);

    const handleRemoveSelected = useCallback(() => {
        removeEntitiesFromPage(selected);
    }, [selected]);

    const handleChangePage = useCallback(
        (e, newPage) => {
            changePage(newPage, limit);
        },
        [limit],
    );

    const handleChangePerPage = useCallback((e) => {
        changePage(1, parseInt(e.target.value, 10));
    }, []);

    return (
        <>
            <Container
                component={Paper}
                style={{ padding: 0 }}
                maxWidth={false}
            >
                <Toolbar
                    selectedProps={{
                        selectedCount: selected.length,
                        onRemove: handleRemoveSelected,
                        onReset: handleMultipleSelect,
                    }}
                    searchProps={{
                        placeholder: searchPlaceholder || 'Search',
                        value: searchKeyword,
                        active: isSearchActive,
                        onChange: setSearchKeyword,
                        onSearch: confirmFilters,
                    }}
                    filterProps={{
                        filters,
                        onChange: setFilters,
                        onSubmit: confirmFilters,
                    }}
                    viewTypesProps={{
                        viewTypes,
                        viewType,
                        onChangeView: setViewType,
                    }}
                >
                    <ToolbarSection>
                        <Tooltip title={`Add ${entityName}`}>
                            <IconButton
                                color="primary"
                                component={Link}
                                to={`${location.pathname}/add`}
                            >
                                <LibraryAddIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {!total && status?.isProcessing
                                ? 'Loading...'
                                : `Quantity: ${total} (page: ${page}/${maxPages})`}
                        </Typography>
                    </ToolbarSection>
                </Toolbar>

                {!entities.length ? (
                    <EmptyText>
                        {status?.isProcessing
                            ? 'Loading...'
                            : isSearchActive
                            ? 'No results found.'
                            : `No ${entityName} has been added.`}
                    </EmptyText>
                ) : (
                    <Layout
                        viewType={viewType}
                        selected={selected}
                        entities={entities}
                        onSelect={selectEntity}
                        onMultipleSelect={handleMultipleSelect}
                        baseRoute={baseRoute}
                        onRemove={removeEntitiesFromPage}
                    />
                )}
            </Container>

            {entities.length > 0 && (
                <Pagination
                    variant="outlined"
                    disabled={status.isProcessing}
                    maxPages={maxPages}
                    siblingCount={1}
                    page={page || 1}
                    perPage={limit}
                    perPageOptions={perPageOptions}
                    onChangePage={handleChangePage}
                    onChangePerPage={handleChangePerPage}
                />
            )}
        </>
    );
};

export default (params) => Hoc(params)(EntityListPage);
