import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import appReducer from '~s/ducks/app/reducers';
import snackbarReducer from '~s/ducks/notifier/reducers';

import { reducer as entities} from '~s/ducks/entity/'
import { reducer as pages} from '~s/ducks/page/'

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    form: reduxFormReducer,
    app: appReducer,
    snackbar: snackbarReducer,
    entities,
    pages
});

export default rootReducer;