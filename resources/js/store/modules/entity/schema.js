import Model from './Model';

const category = new Model({
    name: 'category',
    struct: {
        children: true,
    },
});

const product = new Model({
    name: 'product',
    struct: {
        categories: [category.schema],
    },
});

category.defineRelations([
    Model.hasMany('products', product)
]);

export default [
    product,
    category
];