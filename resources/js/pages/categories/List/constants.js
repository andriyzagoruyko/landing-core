
export const table =  [
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
        name: 'description',
        label: 'Description',
        disablePadding: false,
        maxWidth: 300,
        search: true
    },
]

const perPageOptions = [12, 36, 60];

export const settings = {
    entityName: 'category',
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
