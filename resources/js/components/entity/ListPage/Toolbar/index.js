import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles'
import clsx from 'clsx'
import { Toolbar, Tooltip, IconButton, Typography, Box } from '@material-ui/core';
import ToolbarSection from '../Toolbar/Section';
import Search from '~c/common/Search/';
import ViewTypes from '../Toolbar/ViewTypes';
import Filter from '~c/common/Filter';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';

const SelectedToolbar = ({ selectedCount, onReset, onRemove }) => {
    const classes = useStyles();
    
    return <>
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {selectedCount} selected
        </Typography>

        <Box className={classes.selectedButtons}>
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
        </Box>
    </>
}

const CustomTableToolbar = ({ selectedProps, searchProps, filterProps, viewTypesProps, children }) => {
    const classes = useStyles();

    return (
        <Toolbar position="static"
            className={clsx(classes.toolbar, { [classes.highlight]: selectedProps.selectedCount > 0 })}
        >
            {selectedProps.selectedCount > 0
                ?  <SelectedToolbar {...selectedProps} />
                : (
                    <>
                        { Boolean(searchProps) && <Box className={classes.search}> <Search {...searchProps} /></Box>}
                        {children}
                        <ToolbarSection>
                            {Boolean(filterProps) && <Box className={classes.filter}> <Filter {...filterProps} /></Box>}
                            {Boolean(filterProps) && <ViewTypes {...viewTypesProps} />}
                        </ToolbarSection>
                    </>
                )
            }
        </Toolbar >
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