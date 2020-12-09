import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell, Checkbox } from '@material-ui/core/';

const CustomTableHead = ({ columns, checkbox, checked, indeterminate, onSelectAll }) => {
    return (
        <TableHead>
            <TableRow>
                {checkbox && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="secondary"
                            checked={checked}
                            indeterminate={indeterminate}
                            onChange={() => onSelectAll()}
                        />
                    </TableCell>
                )}
                {columns.map(column => (
                    <TableCell
                        padding={column.disablePadding ? 'none' : 'default'}
                        align={column.align}
                        key={column.name}
                        width={column.maxWidth}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

CustomTableHead.propTypes = {
    columns: PropTypes.array.isRequired,
    checkbox: PropTypes.bool,
    onSelectAll: PropTypes.func
};

CustomTableHead.defaultProps = {
    onSelectAll: () => { }
};

export default CustomTableHead;