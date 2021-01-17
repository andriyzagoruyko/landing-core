import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from '~s/';
import { theme } from './theme';
import App from './App';
import { Button } from '@material-ui/core/'

const store = configureStore();

const AppContainer = () => {
    const notistackRef = React.createRef();
    const onClickDismiss = key => {
        notistackRef.current.closeSnackbar(key);
    }

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <SnackbarProvider
                    ref={notistackRef}
                    action={(key) => (
                        <Button variant="contained" size="small" onClick={() => onClickDismiss(key)}>
                            got it
                        </Button>
                    )}
                >
                    <ConnectedRouter history={history} >
                        <App />
                    </ConnectedRouter>
                </SnackbarProvider>
            </Provider>
        </ThemeProvider>
    );
}

export default AppContainer;
