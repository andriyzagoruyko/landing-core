const table = (renderActionButtons) => [
    {
        name: 'id',
        label: 'ID',
        padding: 'none',
        width: 50,
    },
    {
        name: 'title',
        label: 'Category name',
        width: 300,
    },
    {
        name: 'description',
        label: 'Description',
        width: 300,
    },
    {
        name: 'actions',
        label: 'Actions',
        align: 'right',
        component: (category) => renderActionButtons(category.id),
    }
];

export default table;
