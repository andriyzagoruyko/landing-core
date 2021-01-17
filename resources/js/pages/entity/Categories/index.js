/* Containers */
import EntityList from '~c/entity/ListPage/';
import EntityForm from '~c/entity/FormPage/'

/* Layouts */
import ListLayout from './List';
import FormLayout from './Form';

/* Constants */
import filterStructure from './filters';
import validate from './validation';

const form = { container: EntityForm, component: FormLayout, validate }

const settings = {
    entityName: "category",
    pages: [
        {
            searchPlaceholder: "Search by name",
            availableViews: [],
            defaultViewType: 'table',
            container: EntityList,
            component: ListLayout,
            filterStructure,
        },
        { type: 'add', ...form },
        { type: 'edit', route: '/:id(\\d+)', ...form }
    ]
}

export default settings;
