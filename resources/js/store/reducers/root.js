import { combineReducers } from 'redux'
import { appReducer } from './app'
import { productsReducer } from './products'
import { categoriesReducer } from './categories'
import { noticesReducer } from './notices'
import { reducer as reduxFormReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router'

export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    app: appReducer,
    categories: categoriesReducer,
    products: productsReducer,
    notices: noticesReducer,
    form: reduxFormReducer,
});
