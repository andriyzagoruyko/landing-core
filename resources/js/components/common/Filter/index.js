
import Filter from './Filter';

const initializeFilter = (filterStructure, filterParams = {}) => {
    let filters = {};

    filterStructure.forEach(({ name, ...item }) => {
        const active = Boolean(filterParams[name]);
        const value = filterParams[name] ? filterParams[name] : [];
        filters[name] = { ...item, name, active, value }
    });

    return filters;
}

export { Filter, initializeFilter }