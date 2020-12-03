import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell, Checkbox } from '@material-ui/core/';

const CustomTableHead = ({ columns, checkbox, selectedCount, rowsNum, onSelectAll }) => {
    return (
        <TableHead>
            <TableRow>
                {checkbox && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="secondary"
                            checked={selectedCount > 0}
                            indeterminate={selectedCount > 0 && selectedCount < rowsNum}
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
    rowsNum: PropTypes.number.isRequired,
    selectedCount: PropTypes.number.isRequired,
    onSelectAll: PropTypes.func
};

CustomTableHead.defaultProps = {
    onSelectAll: () => { }
};

export default CustomTableHead;