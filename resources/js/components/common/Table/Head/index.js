import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell, Checkbox } from '@material-ui/core/';
import { column } from '../proptypes';

const CustomTableHead = ({ columns, checkboxProps }) => (
    <TableHead>
        <TableRow>
            {Boolean(checkboxProps) && (
                <TableCell padding="checkbox">
                    <Checkbox color="secondary" {...checkboxProps} />
                </TableCell>
            )}
            {columns.map(({ name, label, component, ...rest }) => (
                <TableCell key={name} {...rest}> {label} </TableCell>
            ))}
        </TableRow>
    </TableHead>
);

CustomTableHead.propTypes = {
    columns: PropTypes.arrayOf(column).isRequired,
    checkboxProps: PropTypes.shape({
        checked: PropTypes.bool,
        indeterminate: PropTypes.bool,
        onChange: PropTypes.func
    })
};

export default CustomTableHead;