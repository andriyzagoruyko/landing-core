
import { selectors } from '~s/ducks/page/';
import entitySelectors from '~s/ducks/entity/selectors';
import { operations as actions } from '~s/ducks/page/';

const pagesMiddleware = (store) => next => (action) => {
    const state = store.getState();
    const entityName = selectors.getActivePage(state);

    if (entityName) {
        const processing = selectors.getProcessing(state, entityName);

        if (processing && action.type === processing) {
            store.dispatch(actions.setProcessing(entityName, ''));
        }

        if (action.type === '@@router/LOCATION_CHANGE') {
            const query = action.payload.location.search.replace('?', '');

            if (query) {
                if (action.payload.action === 'POP') {
                    store.dispatch(actions.setQuery(entityName, query));
                }

                if (action.payload.action === 'PUSH' || action.payload.action === 'REPLACE') {
                    const status = entitySelectors.getStatus(state, entityName, query);

                    if (status && status.result) {
                        store.dispatch(actions.setQuery(entityName, query));
                    }
                }
            }
        }
    }

    return next(action);
};

export default pagesMiddleware;