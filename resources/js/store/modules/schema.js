import { schema } from 'normalizr';
import { plural } from '~/helpers/';

const category = new schema.Entity(
    'category',
    {},
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
    {},
    {
        processStrategy: (value) => {
            return {
                ...value,
                categories: value.categories.map(cat => ({
                    ...cat, products: [...(cat.products || []), value.id]
                }))
            }
        }
    }
);

product.define(
    {
        categories: [category]
    }
);

category.define(
    {
        children: [category]
    },
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