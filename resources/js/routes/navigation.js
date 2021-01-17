import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const navList = [
    {
        label: 'Main page',
        to: '/',
        exact: true,
        icon: <HomeIcon color="primary" />
    },
    {
        label: 'Store',
        icon: <ShoppingCartIcon color="primary" />,
        submenu: [
            {
                label: 'Products',
                to: '/products',
                exact: false,
            },
            {
                label: 'Categories',
                to: '/categories',
                exact: false,
            }
        ]
    }
];

export default navList;