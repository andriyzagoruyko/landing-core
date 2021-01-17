import React from 'react';
import Chip from '@material-ui/core/Chip';
import InStockIcon from '@material-ui/icons/AssignmentTurnedIn';
import NotLimitedIcon from '@material-ui/icons/AllInclusive';
import OutOfStockIcon from '@material-ui/icons/Block';

const getProps = (stock) => {
    switch (stock) {
        case null:
            return { icon: <NotLimitedIcon />, color: 'default', label: 'Not limited' }

        case 0:
            return { icon: <OutOfStockIcon />, color: 'secondary', label: 'Out of stock' }

        default:
            return { icon: <InStockIcon />, color: 'primary', label: `In stock: ${stock}` }
    }
}

const Aviability = ({ available, ...restProps }) => (
    <Chip style={{ minWidth: 120 }} {...getProps(available)}  {...restProps} />
);

export default Aviability;