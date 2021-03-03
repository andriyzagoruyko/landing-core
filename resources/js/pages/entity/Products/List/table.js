const table = (renderAvailability, renderActionButtons) => [
    {
        name: 'id',
        label: 'ID',
        padding: 'none',
        width: 50,
    },
    {
        name: 'title',
        label: 'Product name',
        width: 300,
    },
    {
        name: 'article',
        label: 'Article',
        width: 300,
    },
    {
        name: 'available',
        label: 'Availability',
        component: (product) => renderAvailability(product.available),
    },
    {
        name: 'price',
        label: 'Price',
        align: 'right',
    },
    {
        name: 'actions',
        label: 'Actions',
        align: 'right',
        component: (product) => renderActionButtons(product.id),
    }
];

export default table;