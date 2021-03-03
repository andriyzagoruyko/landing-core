import React from 'react';
import Page404 from '~p/errors/e404';

export default (WrappedComponent) => (props) => {
    return props.status?.error &&
        props.status?.error.status === 404 ? (
        <Page404 />
    ) : (
        <WrappedComponent {...props} />
    );
};
