import React from 'react';
import {
    matchPath,
    generatePath,
    Switch,
    Route,
} from 'react-router-dom';
import EntitiesRouter, { entitiesRoutes } from './entities';
import Home from '~p/home';
import Page404 from '~p/errors/e404';

export const routes = {
    home: {
        title: 'Dashboard',
        path: '/',
        exact: true,
        component: Home,
    },

    ...entitiesRoutes,

    notFound: {
        title: 'Page not found',
        path: '**',
        component: Page404,
    },
};

export const Router = () => {
    return (
        <Switch>
            <Route {...routes.home} />
            <EntitiesRouter />
            <Route {...routes.notFound} />
        </Switch>
    );
};

export const routesMatch = (path, url, exact = true) => {
    const match = matchPath(url, { path, exact });
    return (match != null && match.params) != false;
};

export const getRouteByUrl = (url) =>
    Object.values(routes).find((route) =>
        routesMatch(route.path, url),
    ) || {};

export const urlBuilder = (name, params) =>
    routes.hasOwnProperty(name)
        ? generatePath(routes[name].path, params)
        : null;

export { default as navList } from './navigation';

export default routes;
