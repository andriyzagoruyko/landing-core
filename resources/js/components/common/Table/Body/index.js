import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow, Checkbox } from '@material-ui/core/';

const CustomTableBody = ({ columns, rows, selectedRows, emptyRows, checkbox, onSelect }) => {
    const ref = React.createRef();
    const [rowHeight, setRowHeight] = React.useState('0');

    useEffect(() => {
        const tableElement = ref.current;

        if (tableElement) {
            const tr = tableElement.querySelector('tbody tr');
            tr && setRowHeight(tr.clientHeight);
        }
    }, []);

    const handleClickRow = ({ target }, id) => {
        if (checkbox) {
            if (target.tagName === 'TD') {
                onSelect(id);
            }
        }
    }

    return (
        <TableBody ref={ref}>
            {rows.map(row => (
                <TableRow hover key={row.id} onClick={(e) => handleClickRow(e, row.id)}>
                    {checkbox && (
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="secondary"
                                checked={selectedRows[row.id] || false}
                                onChange={() => onSelect(row.id)}
                            />
                        </TableCell>
                    )}

                    {columns.map(column => (
                        <TableCell
                            align={column.align}
                            padding={column.disablePadding ? 'none' : 'default'}
                            key={column.name}
                            width={column.maxWidth}
                        >
                            {column.component ? column.component(row) : row[column.name]}
                        </TableCell>
                    ))}
                </TableRow>
            ))}

            {emptyRows > 0 && (
                <TableRow style={{ height: rowHeight * emptyRows }}>
                    <TableCell
                        style={{ borderBottom: 'none' }}
                        colSpan={columns.length + (checkbox ? 1 : 0)} />
                </TableRow>
            )}
        </TableBody>
    )
}

CustomTableBody.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    emptyRows: PropTypes.number.isRequired,
    checkbox: PropTypes.bool,
    selectedRows: PropTypes.object,
    onSelect: PropTypes.func
};

CustomTableBody.defaultProps = {
    onSelect: () => { }
};

export default CustomTableBody;