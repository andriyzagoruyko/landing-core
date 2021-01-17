import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Chip, Paper } from '@material-ui/core/';
import useStyles from './styles';

const Chips = ({ items, label, emptyText, onClick, onDelete }) => {
    const classes = useStyles();

    return (
        <FormControl fullWidth className={classes.formControl}>
            <InputLabel shrink variant="outlined">{label}</InputLabel>
            <Paper variant="outlined" className={classes.root} onClick={onClick}>
                {items.length === 0
                    ? (
                        <li>
                            <Chip label={emptyText} className={classes.chip} />
                        </li>
                    )
                    : items.map((item) => (
                        <li key={item.title}>
                            <Chip
                                icon={item.icon}
                                label={item.title}
                                onDelete={() => onDelete(item)}
                                className={classes.chip}
                            />
                        </li>
                    ))}
            </Paper>
        </FormControl>
    );
}

Chips.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            icon: PropTypes.reactNode,
        })
    ).isRequired,
    label: PropTypes.string,
    emptyText: PropTypes.string,
    onClick: PropTypes.func,
    onDelete: PropTypes.func
};

Chips.defaultProps = {
    onClick: () => { },
    onDelete: () => { },
    emptyText: 'Not selected'
};


export default Chips;