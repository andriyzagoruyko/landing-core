import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
    aviability: {
        minWidth: 100
    }
});

const Aviability = ({ available }) => {
    const classes = useStyles();
    let color, label;

    if (available > 0) {
        color = 'primary'
        label = 'In stock: ' + available;
    } else {
        if (available == -1) {
            color = 'primary'
            label = 'Not limited'
        } else {
            color = 'secondary'
            label = 'Not in stock';
        }
    }

    return <Chip className={classes.aviability} color={color} label={label} variant="outlined" />;
}

export default Aviability;