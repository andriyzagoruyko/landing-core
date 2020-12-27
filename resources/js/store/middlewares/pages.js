
import { selectors } from '~s/ducks/page/';
import { operations as actions } from '~s/ducks/page/';

const pagesMiddleware = (store) => next => (action) => {
    if (action.type === '@@router/LOCATION_CHANGE') {
        const state = store.getState();
        const entityName = selectors.getActivePage(state);
        const query = action.payload.location.search.replace('?', '');

        if (entityName && query) {
            if (action.payload.action === 'POP') {
                store.dispatch(actions.setQuery(entityName, query));
            }

            if (action.payload.action === 'PUSH' || action.payload.action === 'REPLACE') {
                const status = selectors.getStatus(state, entityName, query);
                
                if (status) {
                    store.dispatch(actions.setQuery(entityName, query));
                }
            }
        }
    }

    return next(action);
};

export default pagesMiddleware;