import React, { useState } from 'react';
import { FormControlLabel, FormGroup, Switch, Fade } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form'

const useStyles = makeStyles((theme) => ({
    formControll: {
        marginLeft: theme.spacing(1)
    },
}));

const renderCheckbox = ({ input, label, meta, onChange, children, ...rest }) => {
    const classes = useStyles();

    return (
        <>
            <FormControlLabel
                label={label}
                className={classes.formControll}
                control={
                    <Switch
                        color="primary"
                        checked={input.value ? true : false}
                        onChange={input.onChange}
                    />
                }
                {...rest}
            />
            
            <Fade in={input.value ? true : false} unmountOnExit>
                <FormGroup row >
                    {children}
                </FormGroup>
            </Fade>
        </>
    )
}

const FormCheckboxField = ({ label, name, children }) => {
    const [enabled, setEnabled] = useState(false);

    return (
        <Field
            label={label}
            name={name}
            component={renderCheckbox}
            children={children}
            onChange={() => setEnabled(!enabled)}
        />
    );
}

export default FormCheckboxField;