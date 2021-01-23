import { schema } from 'normalizr';
import { plural } from '~/helpers/';

class Model {
    constructor({ name, struct }) {
        this.name = name;
        this.plural = plural(name);
        this.relations = { belongsTo: [], hasMany: [] }

        this.schema = new schema.Entity(name, {},
            {
                mergeStrategy: (entityA, entityB) => (
                    this.mergeStrategy(entityA, entityB)
                ),
                processStrategy: (value) => (
                    this.processStrategy(value)
                )
            }
        );

        if (struct.children) {
            struct.children = [this.schema];
        }

        this.schema.define(struct);
    }

    addRelation(relation) {
        this.relations[relation.type].push(relation)
    }

    defineRelations(relations) {
        relations.forEach(relation => {
            this.addRelation(relation);

            if (relation.type === 'hasMany') {
                relation.model.addRelation(Model.belongsTo(this.plural, this))
            }
        });
    }

    getRelations(type = null) {
        return type
            ? this.relations[type]
            : this.relations.filter(relation => relation.length);
    }

    mergeStrategy(entityA, entityB) {
        let relations = {};

        this.relations.hasMany.forEach(item => {
            relations[item.key] = [
                ...(entityA[item.key] || []),
                ...(entityB[item.key] || [])
            ]
        });

        return { ...entityA, ...entityB, ...relations }
    }

    processStrategy(value) {
        let relations = {};

        this.relations.belongsTo.forEach(item => {
            relations[item.key] = value[item.key].map(val => ({
                ...val, [this.plural]: [...(val[this.plural] || []), value.id]
            }))
        });

        return { ...value, ...relations }
    }

    static entitySchema = {};
    static allModels = {};

    static hasMany(key, model) {
        return { key, type: 'hasMany', model }
    }

    static belongsTo(key, model) {
        return { key, type: 'belongsTo', model }
    }

    static getEntitySchema(entityName, isCollection = false) {
        return Model.entitySchema[plural(entityName, isCollection)]
    }

    static registerModels(models) {
        models.forEach(model => {
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
}

export default Model;