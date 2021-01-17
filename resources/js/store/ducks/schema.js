import { schema } from 'normalizr';
import { plural } from '~/helpers/';

const category = new schema.Entity('category');

category.define(
    {
        children: [category]
    },
    {
        mergeStrategy: (entityA, entityB) => ({
            ...entityA,
            ...entityB,

            products: [...(entityA.products || []), ...(entityB.products || [])],
        })
    }
);

const product = new schema.Entity(
    'product',
    {
        categories: [category]
    },
    {
        processStrategy: (value) => ({
            ...value,
            categories: value.categories.map(cat => ({
                ...cat, products: [...(cat.products || []), value.id]
            }))
        })
    }
);

export const entitySchema = {
    product,
    products: [product],
    category,
    categories: [category]
}

console.log('--------------------------------', category);

export const getEntitySchema = (entityName, isMultiple = false) => {
    return entitySchema[plural(entityName, isMultiple)]
}

export default entitySchema;