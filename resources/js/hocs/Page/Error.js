import React from 'react';
import Page404 from '~p/errors/e404';

export default WrappedComponent => props => (
    props.isError ? <Page404 /> : <WrappedComponent {...props} />
);