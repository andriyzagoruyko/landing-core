import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

const withStore = (Component) => () => {
    return (
        <Provider store={store}>
            <Component />
        </Provider>
    );
}

export default withStore; 
