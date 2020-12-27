import { schema } from 'normalizr';
import { plural } from '~/helpers/plural';

const product = new schema.Entity('product');
const products = new schema.Array(product);
const category = new schema.Entity('category');
const categories = new schema.Array(category);

const entitySchema = {
    product,
    products,
    category,
    categories
}

export const getEntitySchema = (entityName, isMultiple = false) => {
    return entitySchema[plural(entityName, isMultiple ? 2 : 1)]
}

export default entitySchema;