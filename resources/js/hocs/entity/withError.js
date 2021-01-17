import React from 'react';
import Page404 from '~p/errors/e404';

export default WrappedComponent => props => {
    return props.error && props.error.status === 404
        ? <Page404 /> : <WrappedComponent {...props} />
}