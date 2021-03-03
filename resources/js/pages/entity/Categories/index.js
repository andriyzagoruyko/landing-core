/* Containers */
import EntityList from '~c/entity/ListPage/';
import EntityForm from '~c/entity/FormPage/';

/* Layouts */
import ListLayout from './List';
import FormLayout from './Form';

/* Constants */
import filterStructure from './filters';
import validate from './validation';

export const CategoriesList = EntityList({
    entityName: 'category',
    searchPlaceholder: 'Search by name',
    component: ListLayout,
    filterStructure,
});

export const CategoriesForm = EntityForm({
    entityName: 'category',
    component: FormLayout,
    validate,
});
