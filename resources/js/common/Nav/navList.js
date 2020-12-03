import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export const navList = [
    {
        name: 'Main page',
        to: 'home',
        icon: <HomeIcon color="primary" />
    },
    {
        name: 'Products',
        icon: <ShoppingCartIcon color="primary" />,
        submenu: [
            {
                name: 'List',
                to: 'products',
            },
            {
                name: 'Add product',
                to: 'productsAdd'
            }
        ]
    }
];

export default navList;
