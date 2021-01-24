import Model from './Model';

const category = new Model({
    name: 'category',
    struct: {
        children: Model.self.many,
    },
    relations: [{
        isTree: true,
        key: 'parent_id',
        many: false,
        selfKey: 'children',
        selfMany: true,
    }]
});

const product = new Model({
    name: 'product',
    struct: {
        categories: [category.schema],
    },
    relations: [{
        model: category,
        key: 'categories',
        many: true,
        selfKey: 'products',
        selfMany: true
    }]
});

export default [
    product,
    category
];