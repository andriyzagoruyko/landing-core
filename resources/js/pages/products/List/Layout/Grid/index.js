import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ProductCard from '../Card'

const useStyles = makeStyles(theme => ({
    grid: {
        padding: theme.spacing(2),
    }
}));

const ProductsGrid = ({ items, selectedItems, onSelect }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.grid}>
            {items.map((item) => (
                <ProductCard
                    key={item.id}
                    checked={selectedItems[item.id] || false}
                    onSelect={() => onSelect(item.id)}
                    {...item}
                />
            ))}
        </Grid >
    )
};

ProductsGrid.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItems: PropTypes.object,
    onSelect: PropTypes.func,
};

ProductsGrid.defaultProps = {
    onSelect: () => { },
};


export default ProductsGrid;

