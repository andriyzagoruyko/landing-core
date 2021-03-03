import { schema } from 'normalizr';
import { plural } from '~/helpers/';

class Model {
    constructor({ name, schema: struct, relations }) {
        this.name = name;
        this.plural = plural(name);
        this.relations = [];
        this.belongs = [];

        this.schema = new schema.Entity(
            name,
            {},
            {
                mergeStrategy: (entityA, entityB) =>
                    this.merge(entityA, entityB),
                processStrategy: (value) => this.process(value),
            },
        );

        Object.entries(struct).forEach(([key, value]) => {
            if (value === Model.self) {
                struct[key] = this.schema;
            } else if (value === Model.self.many) {
                struct[key] = [this.schema];
            }
        });

        this.schema.define(struct);

        if (relations) {
            this.defineRelations(relations);
        }
    }

    merge(entityA, entityB) {
        let relations = {};

        this.belongs.forEach((item) => {
            if (item.selfMany) {
                relations[item.selfKey] = [
                    ...(entityA[item.selfKey] || []),
                    ...(entityB[item.selfKey] || []),
                ];
            }
        });

        return { ...entityA, ...entityB, ...relations };
    }

    process(value) {
        let relations = {};

        this.relations.forEach(({ many, key, selfKey, isTree }) => {
            if (!isTree) {
                if (many) {
                    relations[key] = value[key].map((val) => ({
                        ...val,
                        [selfKey]: [
                            ...(val[selfKey] || []),
                            value.id,
                        ],
                    }));
                } else {
                    relations[key] = value.id;
                }
            }
        });

        return { ...value, ...relations };
    }

    defineRelations(relations) {
        Object.entries(relations).forEach(([key, data]) => {
            const relation = { key, ...data };

            this.relations.push(relation);

            if (relation.model) {
                if (relation.model != this) {
                    relation.model.belongs.push(relation);
                }
            } else {
                relation.model = this;
            }
        });
    }

    getRelations() {
        return this.relations;
    }

    getRelationsKeys() {
        return this.getRelations().map((relation) => relation.key);
    }

    hasRelation() {
        return this.getRelations().length > 0;
    }

    static entitySchema = {};

    static allModels = {};

    static getEntitySchema(entityName, isCollection = false) {
        return Model.entitySchema[plural(entityName, isCollection)];
    }

    static registerModels(models) {
        models.forEach((model) => {
            Model.allModels[model.name] = model;
            Model.entitySchema[model.name] = model.schema;
            Model.entitySchema[model.plural] = [model.schema];
        });

        return Model.getEntityNames();
    }

    static findModel(entityName) {
        return Model.allModels[entityName];
    }

    static getEntityNames() {
        return Object.keys(Model.allModels);
    }

    static get self() {
        return { many: 'many' };
    }
}

export default Model;
