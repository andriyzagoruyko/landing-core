import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Field } from 'redux-form'
import { TextField } from '@material-ui/core';
import useStyles from './styles';

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

const FormField = ({ grow = false, ...rest }) => {
    const classes = useStyles();

    return (
        <Field
            {...rest}
            component={renderTextField}
            variant="outlined"
            margin="normal"
            FormHelperTextProps={{ className: classes.helperText }}
            className={clsx(classes.textField, grow ? classes.textFieldGrow : null)}
        />
    );
}

FormField.propTypes = {
    grow: PropTypes.bool,
};

export default FormField;