import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from '~s/';
import { theme } from './theme';
import App from './App';

const store = configureStore();

const hocApp = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <ConnectedRouter history={history} >
                    <App />
                </ConnectedRouter>
            </Provider>
        </ThemeProvider>
    );
}

export default hocApp;
