
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton, FormControl } from '@material-ui/core/';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
    form: {
        flexDirection: 'row'
    },
    filterField: {
        marginRight: theme.spacing(2),
    },
}));

const FilterRange = ({ label, value, onSubmit }) => {
    const classes = useStyles();
    const [inputs, setInputs] = useState({ ...value });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputs);
    }

    return (
        <FormControl component="form" action="#" className={classes.form} onSubmit={handleFormSubmit}>
            <div className={classes.filterField}>
                <TextField
                    value={inputs.min || ''}
                    id="min"
                    label={label + " min"}
                    type="number"
                    onChange={(e) => setInputs({ ...inputs, min: e.target.value })}
                />
            </div>
            <div className={classes.filterField}>
                <TextField
                    value={inputs.max || ''}
                    id="max"
                    label={label + " max"}
                    type="number"
                    onChange={(e) => setInputs({ ...inputs, max: e.target.value })}
                />
            </div>
            <IconButton aria-label="ok" type="submit">
                <CheckIcon />
            </IconButton>
        </FormControl>
    )
}

export default FilterRange;