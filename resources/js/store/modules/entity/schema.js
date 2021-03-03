import Model from './Model';

const category = new Model({
    name: 'category',
    schema: {
        children: Model.self.many,
    },
    relations: {
        parent_id: {
            isTree: true,
            selfKey: 'children',
            selfMany: true,
        },
    },
});

const product = new Model({
    name: 'product',
    schema: {
        categories: [category.schema],
    },
    relations: {
        categories: {
            model: category,
            many: true,
            selfKey: 'products',
            selfMany: true,
        },
    },
});

const entityNames = Model.registerModels([product, category]);

export default entityNames;
