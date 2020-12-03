import React from 'react';
import { Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: `${theme.spacing(2)}px auto`
    },
}));

const FormButton = ({ label, ...rest }) => {
    const classes = useStyles();

    return (
        <Button variant="contained" color="primary" className={classes.submit} {...rest}>
            {label}
        </Button>
    );
}

export default FormButton;