
import Filter from './Filter';

const initializeFilter = (filterStructure, filterQuery = {}) => {
    let filters = {};

    filterStructure.forEach(({ name, ...item }) => {
        const active = Boolean(filterQuery[name]);
        const value = filterQuery[name] ? filterQuery[name] : [];
        filters[name] = { ...item, name, active, value }
    });

    return filters;
}

export { Filter, initializeFilter }