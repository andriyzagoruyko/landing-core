import { matchPath, generatePath } from "react-router-dom";
import { getEntityRoutes } from './entity';
import Home from '~p/home';
import Page404 from '~p/errors/e404';
import products from '~p/entity/Products/';
import categories from '~p/entity/Categories/';

export const routes = {
    home: {
        name: 'home',
        title: 'Dashboard',
        path: '/',
        component: Home,
        exact: true
    },

    ...getEntityRoutes([
        products,
        categories
    ]),

    notFound: {
        name: 'notFound',
        title: 'Page not found',
        path: '**',
        component: Page404
    }
}

export const routesMatch = (path, url, exact = true) => {
    const match = matchPath(url, { path, exact });
    return (match != null && match.params) != false
}

export const getRouteByUrl = url => (
    Object.values(routes).find(route => routesMatch(route.path, url)) || {}
);

export const urlBuilder = (name, params) => routes.hasOwnProperty(name)
    ? generatePath(routes[name].path, params)
    : null;

export { default as navList } from './navigation';
export default routes;