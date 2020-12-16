import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@material-ui/lab/';
import {  FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import useStyles from './styles';

const CustomPagination = ({ maxPages, page, perPage, perPageOptions, onChangePage, onChangePerPage, disabled, ...props }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel id="per-page" className={classes.label}>Per page</InputLabel>
                <Select
                    disabled={disabled}
                    labelId="per-page"
                    value={perPage}
                    onChange={onChangePerPage}
                    className={classes.select}
                >
                    {perPageOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
            </FormControl>

            <Pagination
                disabled={disabled}
                count={maxPages}
                page={page}
                onChange={onChangePage}
                {...props}
            />
        </div>
    );
}

CustomPagination.propTypes = {
    maxPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    perPageOptions: PropTypes.array.isRequired,
    onChangePage: PropTypes.func,
    onChangePerPage: PropTypes.func,
};

CustomPagination.defaultProps = {
    onChangePage: () => { },
    onChangePerPage: () => { },
};


export default CustomPagination;