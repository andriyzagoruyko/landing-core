import React from 'react';
import Page404 from '~p/errors/e404';
import Home from '~p/home';
import ProductList from '~p/products/list';
import ProductForm from '~p/products/Single/form';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { matchPath, generatePath } from "react-router-dom";

export const routes = {
    home: {
        name: 'home',
        title: 'Dashboard',
        path: '/',
        component: Home,
        exact: true
    },
    products: {
        name: 'products',
        title: 'Products list',
        path: '/products',
        component: ProductList,
        exact: true,
    },
    productsAdd: {
        name: 'productsAdd',
        title: 'Add product',
        path: '/products/add',
        component: ProductForm,
        exact: true,
    },
    productsEdit: {
        name: 'productsEdit',
        title: 'Edit product',
        path: '/products/:id',
        component: ProductForm,
        exact: true,
    },
    notFound: {
        name: 'notFound',
        title: 'Page not found',
        path: '**',
        component: Page404
    }
}

export const navList = [
    {
        label: 'Main page',
        to: '/',
        icon: <HomeIcon color="primary" />
    },
    {
        label: 'Products',
        icon: <ShoppingCartIcon color="primary" />,
        submenu: [
            {
                label: 'List',
                to: '/products',
            },
            {
                label: 'Add product',
                to: '/products/add'
            }
        ]
    }
];

export const routesMatch = (routePath, url) => {
    const match = matchPath(url, {
        path: routePath,
        exact: true
    });

    return (match != null && match.params) != false
}

export const getRouteByUrl = url => Object.values(routes).find(route => routesMatch(route.path, url)) || {};

export const urlBuilder = (name, params) => {
    if (!routes.hasOwnProperty(name)) {
        return null;
    }

    return generatePath(routes[name], params);
}

export default routes;