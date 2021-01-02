
import tableCreator from './tableCreator'

const perPageOptions = [12, 36, 60];

const filterStructure = [
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

export const settings = {
    entityName: 'product',
    perPageOptions,
    initialParams: { page: 1, limit: perPageOptions[0] },
    paramsRestoreOnBack: true,
    paramsRestoreAlways: ['limit'],
    filterStructure,
    tableCreator
}

export default settings;