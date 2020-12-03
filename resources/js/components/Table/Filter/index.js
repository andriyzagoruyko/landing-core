
import Filter from './Filter';
import filterCreator from './filterCreator'

const filterCheck = (row, filters) => {
    let result = true;

    filters.forEach(({ name, type, value }) => {
        if (filterCreator[type].check(value, row[name])) {
            result = false;
        }
    });

    return result;
}

export { Filter, filterCheck }