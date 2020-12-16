import React, { useEffect } from 'react';

const WithTitle = (WrappedComponent) => props => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    return <WrappedComponent {...props} />
}

export default WithTitle;
