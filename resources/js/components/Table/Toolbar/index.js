import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { makeStyles, lighten } from '@material-ui/core/styles';
import { Toolbar, Tooltip, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    toolbar: {
        padding: theme.spacing(2),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flexShrink: 0,
        marginRight: theme.spacing(3)
    },
    tooltip: {
        marginLeft: 'auto'
    },
}));

const CustomTableToolbar = ({ selectedCount, title, children, onRemoveFew }) => {
    const classes = useStyles();
    return (
        <Toolbar
            className={clsx(classes.toolbar, {
                [classes.highlight]: selectedCount > 0,
            })}
        >
            {selectedCount > 0
                ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {selectedCount} selected
                    </Typography>
                )
                : (
                    title && (
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            {title}
                        </Typography>
                    )
                )}
                
            {selectedCount > 0
                ? (
                    <Tooltip title="Delete" className={classes.tooltip}>
                        <IconButton aria-label="delete" onClick={onRemoveFew}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )
                : children}
        </Toolbar>
    );
}

CustomTableToolbar.propTypes = {
    title: PropTypes.string,
    selectedCount: PropTypes.number,
    onRemoveFew: PropTypes.func,
};

CustomTableToolbar.defaultProps = {
    onRemoveFew: () => { }
};

export default CustomTableToolbar;