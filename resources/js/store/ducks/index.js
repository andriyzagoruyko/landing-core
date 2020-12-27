import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import entity from '~s/ducks/entity/';
import page from '~s/ducks/page/';
import appReducer from '~s/ducks/app/reducers';
import noticesReducer  from '~s/ducks/notices/reducers';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    entities: combineReducers({
        product: entity('product'),
        category: entity('category'),
    }),
    pages: combineReducers({
        product: page('product'),
        category: page('category'),
    }),
    app: appReducer,
    notices: noticesReducer,
    form: reduxFormReducer,
});

export default rootReducer;