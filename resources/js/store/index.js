import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from '~s/ducks'

export const history = createBrowserHistory({
    basename: '/admin/',
});

export default function configureStore() {
    const store = createStore(
        rootReducer(history),
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                thunk,
                logger
            )
        ),
    );

    return store
}