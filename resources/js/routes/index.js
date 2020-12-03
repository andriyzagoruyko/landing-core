import Page404 from '~p/errors/e404';
import Home from '~p/home';
import ProductList from '~p/products/list';
import ProductForm from '~p/products/form';

const routes = [
    {
        name: 'home',
        title: 'Main page',
        url: '/',
        component: Home,
        exact: true
    },
    {
        name: 'products',
        title: 'Products',
        url: '/products',
        component: ProductList,
        exact: true,
    },
    {
        name: 'productsAdd',
        title: 'Add product',
        url: '/add-product',
        component: ProductForm,
        exact: true,
    },
    {
        title: 'Page not found',
        url: '**',
        component: Page404
    }
];

let routesMap = {};

routes.forEach(route => {
    if (route.hasOwnProperty('name')) {
        routesMap[route.name] = route.url;
    }
});

const getRouteByParth = path => {
    const result = routes.find(route => route.url === path);
    if (result) {
        return result;
    }

    return routes[routes.length - 1];
}

const urlBuilder = (name, params) => {
    if (!routesMap.hasOwnProperty(name)) {
        return null;
    }

    const url = routesMap[name];

    for (let key in params) {
        url = url.replace(':' + key, params[key]);
    }

    return url;
}

export default routes;
export { routes, routesMap, getRouteByParth, urlBuilder };