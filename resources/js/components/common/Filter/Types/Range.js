
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
    const [inputs, setInputs] = useState(Array.isArray(value) ? [...value] : [value, 0]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        let newInputs = [];

        newInputs[0] = !inputs[0] ? 0 : inputs[0];
        newInputs[1] = !inputs[1] ? 0 : inputs[1];

        setInputs(newInputs);
        onSubmit(newInputs);
    }

    const handleChange = (value, index) => {
        let newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    }

    return (
        <FormControl component="form" action="#" className={classes.form} onSubmit={handleFormSubmit}>
            <div className={classes.filterField}>
                <TextField
                    value={inputs[0] || ''}
                    id="min"
                    label={label + " min"}
                    type="number"
                    onChange={(e) => handleChange(e.target.value, 0)}
                />
            </div>
            <div className={classes.filterField}>
                <TextField
                    value={inputs[1] || ''}
                    id="max"
                    label={label + " max"}
                    type="number"
                    onChange={(e) => handleChange(e.target.value, 1)}
                />
            </div>
            <IconButton aria-label="ok" type="submit">
                <CheckIcon />
            </IconButton>
        </FormControl>
    )
}

export default FilterRange;