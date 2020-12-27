import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    grid: {
        padding: theme.spacing(2),
    }
}));

const ProductsGrid = ({ items, renderCard }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.grid}>
            {items.map((item) => renderCard(item))}
        </Grid >
    )
};

ProductsGrid.propTypes = {
    items: PropTypes.array.isRequired,
};

ProductsGrid.defaultProps = {
    onSelect: () => { },
};


export default React.memo(ProductsGrid);

