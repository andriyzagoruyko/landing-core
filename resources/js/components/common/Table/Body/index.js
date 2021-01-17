import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow, Checkbox } from '@material-ui/core/';
import * as types from '../proptypes';

const CustomTableBody = ({ columns, rows, checkboxProps }) => {
    const handleClickRow = ({ target }, id) => {
        if (Boolean(checkboxProps) && target.tagName === 'TD') {
            checkboxProps.onChange(id);
        }
    }

    return (
        <TableBody>
            {rows.map(row => (
                <TableRow hover key={row.id} onClick={(e) => handleClickRow(e, row.id)}  >
                    {Boolean(checkboxProps) && (
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="secondary"
                                checked={checkboxProps.selected.includes(row.id) || false}
                                onChange={() => checkboxProps.onChange(row.id)}
                            />
                        </TableCell>
                    )}

                    {columns.map(({ name, label, component, ...rest }) => (
                        <TableCell key={name} {...rest}>
                            {component ? component(row) : row[name]}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    )
}

CustomTableBody.propTypes = {
    columns: PropTypes.arrayOf(types.column).isRequired,
    rows: PropTypes.arrayOf(types.row).isRequired,
    checkboxProps: PropTypes.shape({
        selected: PropTypes.arrayOf(PropTypes.number).isRequired,
        onChange: PropTypes.func
    }),
};

export default CustomTableBody;