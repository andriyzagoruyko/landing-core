import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles'
import { Table, TableContainer } from '@material-ui/core';
import Head from './Head';
import Body from './Body';
import * as types from './proptypes';

const CustomTable = (props) => {
    const {
        columns,
        rows,
        checkbox,
        selected,
        onSelect,
        onSelectAll,
        ...restProps
    } = props;

    const classes = useStyles();

    return (
        <TableContainer>
            <Table size='medium' className={classes.table} {...restProps}>
                <Head
                    columns={columns}
                    checkboxProps={{
                        checked: selected.length > 0,
                        indeterminate: selected.length > 0 && selected.length < rows.length,
                        onChange: onSelectAll
                    }}
                />
                <Body columns={columns} rows={rows} checkboxProps={{ selected, onChange: onSelect }} />
            </Table>
        </TableContainer>
    );
}

CustomTable.propTypes = {
    selected: PropTypes.arrayOf(PropTypes.number),
    columns: PropTypes.arrayOf(types.column).isRequired,
    rows: PropTypes.arrayOf(types.row).isRequired,
    title: PropTypes.string,
    checkbox: PropTypes.bool,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
};

CustomTable.defaultProps = {
    onSelect: () => { },
    onSelectAll: () => { },
    rows: []
};

export default React.memo(CustomTable);
