import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow, Checkbox } from '@material-ui/core/';

const CustomTableBody = ({ columns, rows, selectedRows, checkbox, onSelect }) => {
    const handleClickRow = ({ target }, id) => {
        if (checkbox && target.tagName === 'TD') {
            onSelect(id);
        }
    }


    return (
        <TableBody>
            {Object.values(rows).map(row => (
                <TableRow hover key={row.id} onClick={(e) => handleClickRow(e, row.id)}>
                    {checkbox && (
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="secondary"
                                checked={selectedRows.includes(row.id) || false}
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
        </TableBody>
    )
}

CustomTableBody.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    checkbox: PropTypes.bool,
    selectedRows: PropTypes.array,
    onSelect: PropTypes.func
};

CustomTableBody.defaultProps = {
    onSelect: () => { }
};

export default CustomTableBody;