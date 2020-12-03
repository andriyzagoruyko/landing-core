import { combineReducers } from 'redux'
import { appReducer } from './app'
import { productsReducer } from './products'
import { noticesReducer } from './notices'
import { reducer as reduxFormReducer } from 'redux-form';

export const rootReducer = combineReducers({
    app: appReducer,
    products: productsReducer,
    notices: noticesReducer,
    form: reduxFormReducer
});
