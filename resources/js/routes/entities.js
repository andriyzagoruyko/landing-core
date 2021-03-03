import React from 'react';
import { Route } from 'react-router-dom';
import { ProductsList, ProductsForm } from '~p/entity/Products/';
import {
    CategoriesList,
    CategoriesForm,
} from '~p/entity/Categories/';
import { plural, ucFirst } from '~/helpers/index';

export const entitiesRoutes = {
    productList: {
        title: 'Products list',
        path: '/products',
        component: ProductsList,
    },
    productAdd: {
        title: 'Add product',
        path: '/products/add',
        component: ProductsForm,
    },
    productEdit: {
        title: 'Edit product',
        path: '/products/:id(\\d+)',
        component: ProductsForm,
    },
    categoryList: {
        title: 'Category list',
        path: '/categories',
        component: CategoriesList,
    },
    categoryAdd: {
        title: 'Add category',
        path: '/categories/add',
        component: CategoriesForm,
    },
    categoryEdit: {
        title: 'Edit category',
        path: '/categories/:id(\\d+)',
        component: CategoriesForm,
    },
};

export const getEntityRoute = (entityName, type = 'list') => {
    const routeName = `${entityName}${ucFirst(type)}`;
    return entitiesRoutes[routeName];
};

const EntitiesRouter = () =>
    Object.values(
        entitiesRoutes,
    ).map(({ component: Component, title, ...rest }) => (
        <Route
            {...rest}
            key={title}
            render={() => <Component title={title} />}
            exact
        />
    ));

export default EntitiesRouter;
