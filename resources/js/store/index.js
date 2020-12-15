import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/root'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { historyState } from './middlewares/historyState'
import logger from 'redux-logger'

export const history = createBrowserHistory({
    basename: '/admin/',
})

export default function configureStore() {
    const store = createStore(
        rootReducer(history),
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                historyState(history),
                thunk,
                //logger
            )
        ),
    );

    return store
}