import React from 'react';
import { Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: `${theme.spacing(2)}px auto`
    },
}));

const FormButton = ({ children, ...rest }) => {
    const classes = useStyles();

    return (
        <Button className={classes.submit} {...rest}>
            {children}
        </Button>
    );
}

export default FormButton;