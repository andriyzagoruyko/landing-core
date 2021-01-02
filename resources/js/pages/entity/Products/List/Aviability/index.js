import React from 'react';
import Chip from '@material-ui/core/Chip';

const getProps = (stock) => {
    const noLimit = stock === -1;

    return stock < 1
        ? { color: noLimit ? 'primary' : 'secondary', label: noLimit ? 'Not limited' : 'Not in stock' }
        : { color: 'primary', label: `In stock: ${stock}` }
}

const Aviability = ({ available, ...restProps }) => (
    <Chip style={{ minWidth: 100 }} {...getProps(available)}  {...restProps} />
);

export default Aviability;