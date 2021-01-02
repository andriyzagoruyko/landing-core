import React from 'react';
import Aviability from './Aviability'
import ActionButtons from './ActionButtons'

const tableCreator = (callbacks) => [
    {
        name: 'id',
        label: 'ID',
        disablePadding: true,
        maxWidth: 50,
    },
    {
        name: 'title',
        label: 'Product name',
        maxWidth: 300,
        disablePadding: false,
        search: true
    },
    {
        name: 'article',
        label: 'Article',
        disablePadding: false,
        maxWidth: 300,
        search: true
    },
    {
        name: 'available',
        label: 'Availability',
        disablePadding: false,
        component: (product) => <Aviability variant="outlined" available={product.available} />,
        filterType: 'range'
    },
    {
        name: 'price',
        label: 'Price',
        align: 'right',
        disablePadding: false,
        filterType: 'range'
    },
    {
        name: 'actions',
        label: 'Actions',
        align: 'right',
        disablePadding: false,
        component: (product) => <ActionButtons id={product.id} callbacks={callbacks} />,
    }
];

export default tableCreator;