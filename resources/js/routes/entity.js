import { plural, ucFirst } from '~/helpers';

const withRoute = container => (entityName, params) => {
    const pluralName = plural(entityName);

    const {
        type = '',
        baseRoute = pluralName,
        route = type ? `/${type}` : '',
        path = `/${baseRoute}${route}`,
        title = ucFirst(type ? `${type} ${entityName}` : pluralName)
    } = params;

    const name = `${entityName}${ucFirst(type)}`;
    const component = container({ entityName, ...params });

    return { [name]: { name, title, path, component, exact: true } };
}

export const getEntityRoutes = (entities) => {
    let result = {};

    entities.forEach(({ entityName, pages }) => pages.forEach(({ container, ...rest }) => (
        result = { ...result, ...withRoute(container)(entityName, rest) }
    )));

    return result;
}