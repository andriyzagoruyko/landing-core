import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, IconButton } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    search: {
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    searchInput: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    searchButton: {
        padding: 10,
    },
}));

const CustomTableSearch = ({ show, value, placeholder, onChange }) => {
    if (!show) {
        return null;
    }

    const classes = useStyles();

    return (
        <Paper variant="outlined" className={classes.search}>
            <InputBase
                className={classes.searchInput}
                placeholder={placeholder || 'Search'}
                value={value}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => onChange(e.target.value)}
            />
            <IconButton className={classes.searchButton} >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

CustomTableSearch.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

CustomTableSearch.defaultProps = {
    onChange: () => { }
};

export default CustomTableSearch;