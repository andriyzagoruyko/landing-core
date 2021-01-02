import React, { useEffect } from 'react';
import { compose } from 'redux';
import List from '~/hocs/Page/List';
import ErrorPage from '~/hocs/Page/Error';
import useTitle from '~/hooks/useTitle';

/* Components */
import Loader from '~c/Preloader';

const Container = (WrappedComponent) => ({
    isError,
    initializePage,
    restoredQuery,
    currentQuery,
    filterParams,
    filterStructure,
    ...props
}) => {
    const { history, search, processing, setActive, title } = props;

    useTitle(title);

    useEffect(() => {
        restoredQuery && history.replace({ search: restoredQuery });
    }, [history.location]);

    useEffect(() => {
        setActive(true);
        initializePage(restoredQuery || currentQuery, search, filterStructure, filterParams);
        return () => setActive(false);
    }, []);

    return <>
        {processing != '' && <Loader />}
        <WrappedComponent {...props} />
    </>
}

export default params => WrappedComponent => compose(
    List(params),
    ErrorPage,
    Container
)(WrappedComponent);
