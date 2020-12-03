import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles'
import { Table, TableContainer, TablePagination } from '@material-ui/core';
import { Container, Paper, Typography } from '@material-ui/core';
import { Filter, filterCheck } from './Filter';
import Search from '~c/Search/';
import Head from './Head/';
import Body from './Body/';
import Toolbar from './Toolbar/';

const CustomTable = ({ columns, rows, title, perPage, checkbox, onSelect, searchPlaceholder, onClickRemoveFew, empty, ...restProps }) => {
    const classes = useStyles();
    const [selectedRows, setSelectedRows] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(perPage);
    const [filter, setFilter] = React.useState({});
    const [search, setSearch] = React.useState({ value: '', items: [] });
    const selectedCount = Object.keys(selectedRows).length;
    const activeFilters = Object.values(filter).filter(item => item.active);

    useEffect(() => {
        const filterColumns = columns.filter(column => Boolean(column.filterType));
        const searchColumns = columns.filter(column => Boolean(column.search))

        if (filterColumns.length) {
            let filterItems = {}

            filterColumns.forEach(({ name, label, filterType }) => {
                filterItems[name] = {
                    name,
                    label,
                    type: filterType,
                    active: false,
                    value: {}
                }
            });

            setFilter(filterItems);
        }

        if (searchColumns.length) {
            setSearch({
                ...search,
                items: searchColumns.map(({ name }) => name)
            });
        }
    }, []);

    const handleSelect = (index) => {
        const newChecked = { ...selectedRows }

        if (newChecked[index]) {
            delete newChecked[index];
        }
        else {
            newChecked[index] = true;
        }

        setSelectedRows(newChecked);
        onSelect(newChecked, rows[newChecked[index]]);
    }

    const handleSelectAll = () => {
        let newChecked = {};

        if (selectedCount <= 0) {
            rows.forEach(row => newChecked[row.id] = true);
        }

        setSelectedRows(newChecked);
        onSelect(newChecked, rows);
    }

    const handleRemoveFew = async () => {
        await onClickRemoveFew(rows.filter(row => selectedRows[row.id]));
        setSelectedRows({});
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const searchCheck = (row, search) => {
        let result = false;

        search.items.forEach(name => {
            if (row[name].includes(search.value)) {
                result = true;
            }
        });

        return result;
    }

    const applyFilters = (rows, activeFilters, search) => {
        const result = useMemo(() => {
            rows = activeFilters.length
                ? rows.filter(row => filterCheck(row, activeFilters))
                : rows;

            return search.value
                ? rows.filter(row => searchCheck(row, search))
                : rows;
        }, [rows, filter, search]);

        const maxPages = Math.ceil(result.length / rowsPerPage);

        if (page && page >= maxPages) {
            setPage(maxPages - 1);
        }

        return result;
    }

    const filteredRows = applyFilters(rows, activeFilters, search);

    return (
        <>
            <Container component={Paper} className={classes.root} maxWidth='false'>
                <Toolbar
                    title={title}
                    selectedCount={selectedCount}
                    onRemoveFew={handleRemoveFew}
                >
                    <Search
                        show={search.items.length > 0}
                        value={search.value}
                        placeholder={searchPlaceholder}
                        onChange={(value) => setSearch({ ...search, value })}
                    />
                    <Filter
                        show={Object.keys(filter).length > 0}
                        filterItems={filter}
                        filterBadge={activeFilters.length}
                        onFilterChange={(filters) => setFilter(filters)}
                    />
                </Toolbar>
                <TableContainer  >
                    {(!filteredRows.length)
                        ? (
                            <Container className={classes.container}>
                                <Typography variant="subtitle1" component="span">
                                    {(activeFilters.length || search.value)
                                        ? "No results found"
                                        : empty}
                                </Typography>
                            </Container>
                        )
                        : (
                            <Table size='medium' className={classes.table} {...restProps}>
                                <Head
                                    columns={columns}
                                    checkbox={checkbox}
                                    selectedCount={selectedCount}
                                    rowsNum={filteredRows.length}
                                    onSelectAll={handleSelectAll}
                                />
                                <Body
                                    columns={columns}
                                    rows={filteredRows}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    selectedRows={selectedRows}
                                    checkbox={checkbox}
                                    onSelect={handleSelect} />
                            </Table>
                        )}
                </TableContainer>

                {(rowsPerPage > 0 && rows.length > 0) && (
                    <TablePagination
                        rowsPerPageOptions={[perPage, perPage * 3, perPage * 5]}
                        component="div"
                        count={filteredRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={(e, newPage) => setPage(newPage)}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        className={classes.pagination}
                    />
                )}
            </Container>
        </>
    );
}

CustomTable.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    perPage: PropTypes.number,
    checkbox: PropTypes.bool,
    onCheck: PropTypes.func,
};

CustomTable.defaultProps = {
    perPage: 0,
    empty: "No results found.",
    onSelect: () => { },
    onClickRemoveFew: () => { }
};

export default CustomTable;
