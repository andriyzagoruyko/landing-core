import React, { useState } from 'react';
import { FormControlLabel, FormGroup, Checkbox } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { makeFields } from '../fieldCreator';
import { Field } from 'redux-form'

const useStyles = makeStyles((theme) => ({
    formControll: {
        marginLeft: theme.spacing(1)
    }
}));

const renderCheckbox = ({ input, label, meta, onChange, ...rest }) => {
    const classes = useStyles();

    return (
        <FormControlLabel
            label={label}
            className={classes.formControll}
            control={
                <Checkbox
                    color="primary"
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
            }
            {...rest}
        />
    )
}

const FormCheckboxField = ({ lable, name, fields }) => {
    const [enabled, setEnabled] = useState(false);

    return (
        <>
            <Field
                label={lable}
                name={name}
                component={renderCheckbox}
                onChange={() => setEnabled(!enabled)}
            />

            <FormGroup row >
                {enabled && makeFields(fields)}
            </FormGroup>
        </>

    );
}

export default FormCheckboxField;