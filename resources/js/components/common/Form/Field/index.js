import React from 'react';
import clsx from 'clsx';
import { Field } from 'redux-form'
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            flexGrow: 1,
        },
    },
    textFieldGrow: {
        flexGrow: 1,
    },
    helperText: {
        position: 'absolute',
        bottom: -5,
        transform: 'translateY(100%)'
    },
}));

const renderTextField = (props) => {
    const {
        input,
        meta: { touched, invalid, error },
        ...custom
    } = props;

    return (
        <TextField
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    );
}

const FormField = ({ grow = true, ...rest }) => {
    const classes = useStyles();
    return (
        <Field
            {...rest}
            component={renderTextField}
            FormHelperTextProps={
                { className: classes.helperText }
            }
            variant="outlined"
            margin="normal"
            className={clsx(classes.textField, grow ? classes.textFieldGrow : null)}
        />
    );
}


export default FormField;