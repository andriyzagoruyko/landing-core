import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles'
import clsx from 'clsx'
import { Toolbar, Tooltip, IconButton, Button, Typography, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import AddIcon from '@material-ui/icons/Add';
import Search from '~c/common/Search/';
import { Filter } from '~c/common/Filter';
import { Link } from 'react-router-dom';

const CustomTableToolbar = (props) => {
    const {
        selectedCount,
        total,
        page,
        maxPages,
        view,
        onReset,
        onRemove,
        onChangeView,
        searchProps,
        filterProps
    } = props;

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
                : null}

            {selectedCount > 0
                ? (
                    <div className={classes.tooltip}>
                        <Tooltip title="Cancel">
                            <IconButton aria-label="cancel" onClick={onReset}>
                                <UndoIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete" >
                            <IconButton aria-label="delete" onClick={onRemove}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                )
                : (
                    <Box className={classes.main}>
                        <Box className={classes.search}>
                            <Search placeholder="Search by name and article" {...searchProps} />
                        </Box>

                        <Box className={classes.section}>
                            <Button
                                className={classes.button}
                                size="small"
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={'/products/add'}
                            >
                                <AddIcon /> Add product
                            </Button>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Quantity: {total}&nbsp; (page: {page}/{maxPages})
                            </Typography>
                        </Box>

                        <Box className={classes.section}>
                            <div className={classes.filter}>
                                <Filter show {...filterProps} />
                            </div>
                            <Tooltip title="Table view">
                                <IconButton
                                    aria-label="table"
                                    onClick={() => onChangeView('table')}
                                    color={view === 'table' ? 'primary' : 'default'}
                                >
                                    <ViewListIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Cards view">
                                <IconButton
                                    aria-label="cards"
                                    onClick={() => onChangeView('grid')}
                                    color={view === 'grid' ? 'primary' : 'default'}
                                >
                                    <ViewComfyIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>

                    </Box>
                )}
        </Toolbar>
    );
}

CustomTableToolbar.propTypes = {
    title: PropTypes.string,
    selectedCount: PropTypes.number,
    onRemove: PropTypes.func,
};

CustomTableToolbar.defaultProps = {
    onRemove: () => { }
};

export default CustomTableToolbar;