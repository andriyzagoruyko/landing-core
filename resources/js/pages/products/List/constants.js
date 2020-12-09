
import React from 'react';
import Aviability from './Aviability/index.js'
import ActionsButtons from './ActionsButtons'

export const tableStructure = [
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
        component: (product) => <Aviability available={product.available} />,
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
        component: (product) => <ActionsButtons id={product.id} />,
    }
]

export const filterStructure = [
    {
        name: 'available',
        label: 'Availability',
        type: 'range',
    },

    {
        name: 'price',
        label: 'Price',
        type: 'range',
    }
]


export const perPageOptions = [10, 30, 50, 100];