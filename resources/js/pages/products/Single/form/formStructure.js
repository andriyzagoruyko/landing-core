const formSections = [
    {
        title: 'General',
        fields: [
            {
                variant: 'field',
                name: 'title',
                label: 'Product name',
            },
            {
                variant: 'field',
                name: 'article',
                label: 'Product article',
            },
            {
                variant: 'field',
                name: 'available',
                label: 'Availability',
                type: 'number',
            },
        ]
    },
    {
        title: 'Price',
        fields: [
            {
                variant: 'field',
                name: 'price',
                label: 'Product price',
                type: 'number',
                grow: false
            },
            {
                variant: 'checkboxHiddenField',
                lable: 'With sale',
                name: 'saleEnabled',
                fields: [
                    {
                        variant: 'field',
                        name: 'sale',
                        label: 'Sale in %',
                        type: 'number',

                    },
                    {
                        variant: 'field',
                        name: 'saleExpires',
                        id: "datetime-local",
                        label: "Sale expires at",
                        type: "datetime-local",
                        helperText: "Optional",
                        InputLabelProps: {
                            shrink: true,
                        },
                    },
                ]
            },
        ]
    },
    {
        title: 'Description',
        divider: false,
        fields: [
            {
                variant: 'field',
                name: 'description',
                label: 'Product description',
                multiline: true,
                fullWidth: true,
                rows: 8
            },
        ]
    },
    {
        divider: false,
        fields: [
            {
                variant: 'button',
                label: 'Submit',
                type: 'submit'
            },
        ]
    }
]

export default formSections;