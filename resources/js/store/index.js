import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router'
import normalizeMiddleware from './middlewares/normalize'
import pagesMiddleware from './middlewares/pages'
import apiMiddleware from './middlewares/api'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from '~s/ducks'

export const history = createBrowserHistory({
    basename: '/admin/',
})

export default function configureStore() {
    const store = createStore(
        rootReducer(history),
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                normalizeMiddleware,
                pagesMiddleware,
                apiMiddleware,
                thunk,
                logger
            )
        ),
    );

    return store
}