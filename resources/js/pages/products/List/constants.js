
import React from 'react';
import Aviability from './Aviability'

export const table = (renderActionButtons) => [
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
        component: (product) => renderActionButtons(product.id),
    }
]

const perPageOptions = [12, 36, 60];

export const settings = {
    entityName: 'product',
    perPageOptions,
    initialParams: { page: 1, limit: perPageOptions[0] },
    paramsRestoreOnBack: true,
    paramsRestoreAlways: ['limit'],
    filterStructure: [
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
}

export default { table, settings }
