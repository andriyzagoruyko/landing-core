import React from 'react';
import { Paper } from '@material-ui/core/';
import useStyles from './styles';

const Form = ({ children, ...rest }) => {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.paper} {...rest}>
            {children}
        </Paper>
    );
}


export default Form;