import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Paper, Tooltip, IconButton, Typography } from '@material-ui/core';
import EmptyText from '~c/entity/ListPage/EmptyText'
import Pagination from '~c/common/Pagination/';
import Toolbar from '~c/entity/ListPage/Toolbar/';
import ToolbarSection from '../Toolbar/Section';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

const EntityListPage = (props) => {
    const {
        Layout,
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
        viewTypeItems
    } = props;

    return (
        <>
            <Container component={Paper} style={{ padding: 0 }} maxWidth={false} >
                <Toolbar
                    selectedProps={{
                        selectedCount: selected.length,
                        onRemove: () => removeEntitiesFromPage(selected),
                        onReset: () => selectMultiple([])
                    }}
                    searchProps={{
                        placeholder: searchPlaceholder || 'Search',
                        value: searchKeyword,
                        active: isSearchActive,
                        onChange: setSearchKeyword,
                        onSearch: confirmFilters,
                    }}
                    filterProps={{ filters, onChange: setFilters, onSubmit: confirmFilters }}
                    viewTypesProps={{ viewTypeItems, viewType, onChangeView: setViewType }}
                >
                    <ToolbarSection>
                        <Tooltip title={`Add ${entityName}`}>
                            <IconButton color="primary" component={Link} to={`${baseRoute}/add`}>
                                <LibraryAddIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {!total && status.isFetching
                                ? 'Loading...'
                                : `Quantity: ${total} (page: ${page}/${maxPages})`}
                        </Typography>
                    </ToolbarSection>
                </Toolbar>

                {!entities.length
                    ? (
                        <EmptyText>
                            {status.isFetching
                                ? "Loading..."
                                : isSearchActive ? "No results found." : `No ${entityName} has been added.`
                            }
                        </EmptyText>
                    )
                    : (
                        <Layout
                            viewType={viewType}
                            selected={selected}
                            entities={entities}
                            onSelect={selectEntity}
                            onMultipleSelect={() => selectMultiple(entities.map(e => e.id))}
                            baseRoute={baseRoute}
                            onRemove={removeEntitiesFromPage}
                        />
                    )
                }
            </Container>

            {entities.length > 0 && (
                <Pagination
                    variant="outlined"
                    disabled={status.isFetching}
                    maxPages={maxPages}
                    siblingCount={1}
                    page={page}
                    perPage={limit}
                    perPageOptions={perPageOptions}
                    onChangePage={(e, newPage) => changePage(newPage, limit)}
                    onChangePerPage={(e) => changePage(1, parseInt(e.target.value, 10))}
                />
            )}
        </>
    )
}

export default EntityListPage;