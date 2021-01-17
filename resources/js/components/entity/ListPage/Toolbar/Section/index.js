import React from 'react';
import useStyles from '../styles'
import { Box } from '@material-ui/core';

const ToolbarSection = ({ children }) => {
    const classes = useStyles();

    return <Box className={classes.section}> {children} </Box>
}
export default ToolbarSection;