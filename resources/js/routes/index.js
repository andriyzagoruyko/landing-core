import React from 'react';
import Page404 from '~p/errors/e404';
import Home from '~p/home';
import ProductList from '~p/products/List';
import ProductForm from '~p/products/Form/';
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
        title: 'Products',
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
        exact: true,
        icon: <HomeIcon color="primary" />
    },
    {
        label: 'Store',
        icon: <ShoppingCartIcon color="primary" />,
        submenu: [
            {
                label: 'Products',
                to: '/products?page=1',
                exact: false,
            }
        ]
    }
];

export const routesMatch = (routePath, url, exact = true) => {
    const match = matchPath(url, {
        path: routePath,
        exact
    });

    return (match != null && match.params) != false
}

export const getRouteByUrl = url => Object.values(routes).find(route => routesMatch(route.path, url)) || {};

export const urlBuilder = (name, params) => {
    return routes.hasOwnProperty(name)
        ? generatePath(routes[name].path, params)
        : null;
}

export default routes;