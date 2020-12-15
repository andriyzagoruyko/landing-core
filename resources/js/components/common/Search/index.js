import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, IconButton } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
    search: {
        display: 'flex',
        alignItems: 'center',
        width: 400,
        maxWidth: '100%'
    },
    searchInput: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    searchButton: {
        padding: 10,
    },
}));

const Search = ({ show = true, value, placeholder, active, onChange, onSearch, ...rest }) => {
    if (!show) {
        return null;
    }

    const classes = useStyles();

    const handleClickSearch = (e) => {
        e.preventDefault();
        value.length && onSearch();
    }

    const handleClicReset = () => {
        onChange('');
        if (active) {
            onSearch();
        }
    }

    return (
        <Paper
            variant="outlined"
            component="form"
            onSubmit={handleClickSearch}
            className={classes.search}
        >
            <InputBase
                className={classes.searchInput}
                placeholder={placeholder || 'Search'}
                value={value}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => onChange(e.target.value)}
                {...rest}
            />
            {(active || value.length) ? (
                <IconButton
                    className={classes.searchButton}
                    onClick={handleClicReset}
                >
                    <ClearIcon />
                </IconButton>
            ) : null}

            <IconButton
                className={classes.searchButton}
                onClick={handleClickSearch}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

Search.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    active: PropTypes.bool,
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
};

Search.defaultProps = {
    onChange: () => { },
    onSearch: () => { }
};

export default Search;