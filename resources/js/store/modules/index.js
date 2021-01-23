import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';

import { reducer as snackbarReducer} from '~s/modules/notifier/';
import { reducer as appReducer} from '~s/modules/app/';
import { reducer as entities} from '~s/modules/entity/'
import { reducer as pages} from '~s/modules/page/'


const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    form: reduxFormReducer,
    app: appReducer,
    snackbar: snackbarReducer,
    entities,
    pages
});

export default rootReducer;