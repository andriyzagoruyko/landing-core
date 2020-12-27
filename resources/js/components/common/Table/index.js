import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles'
import { Table, TableContainer } from '@material-ui/core';
import Head from './Head';
import Body from './Body';

const CustomTable = (props) => {
    const {
        columns,
        rows,
        checkbox,
        emptyText,
        selected,
        onSelect,
        onSelectAll,
        ...restProps
    } = props;

    const classes = useStyles();

    return (
        <TableContainer  >
            <Table size='medium' className={classes.table} {...restProps}>
                <Head
                    columns={columns}
                    checkbox={checkbox}
                    checked={selected.length > 0}
                    indeterminate={selected.length  > 0 && selected.length < rows.length}
                    onSelectAll={onSelectAll}
                />
                <Body
                    columns={columns}
                    rows={rows}
                    selectedRows={selected}
                    checkbox={checkbox}
                    onSelect={onSelect} />
            </Table>
        </TableContainer>
    );
}

CustomTable.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    checkbox: PropTypes.bool,
    onCheck: PropTypes.func,
};

CustomTable.defaultProps = {
    onSelect: () => { },
};

export default React.memo(CustomTable);
