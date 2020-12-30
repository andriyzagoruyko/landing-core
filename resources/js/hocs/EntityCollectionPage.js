import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Actions */
import actions from '~s/ducks/page/operations';

/* Selectors */
import entitySelectors from '~s/ducks/entity/selectors';
import pageSelectors from '~s/ducks/page/selectors';

/* Components */
import Page404 from '~p/errors/e404';
import Loader from '~c/Preloader';

const Container = (WrapperComponent) => ({
    isError,
    initializePage,
    restoredQuery,
    currentQuery,
    filterParams,
    filterStructure,
    ...props
}) => {
    const { history, search, processing, setActive } = props;

    useEffect(() => {
        setActive(true);

        if (history.action !== 'REPLACE') {
            if (restoredQuery) {
                history.replace({ search: restoredQuery });
            }

            initializePage(restoredQuery || currentQuery, search, filterStructure, filterParams);
        }

        return () => setActive(false);
    }, [history.location]);

    return isError
        ? <Page404 />
        : <>
            {processing != '' && <Loader />}
            <WrapperComponent {...props} />
        </>
}

const mapStateToProps = (entityName, hocParams) => state => {
    const {
        restoreOnBack,
        restoreAlways,
        initialParams,
        perPageOptions,
        filterStructure
    } = hocParams;

    const query = pageSelectors.getQueryAndParams(
        state, entityName, restoreOnBack, restoreAlways, initialParams
    );

    const { params, savedQuery, restoredQuery, currentQuery } = query;
    const { page, limit, search = '', ...filterParams } = params;
    const status = entitySelectors.getStatus(state, entityName, currentQuery);
    const isError = status.error || (limit && perPageOptions && !perPageOptions.includes(limit));

    return {
        entities: entitySelectors.getCollection(state, entityName, savedQuery),
        maxPages: pageSelectors.getMaxPages(state, entityName, savedQuery),
        total: pageSelectors.getTotal(state, entityName, savedQuery),
        viewType: pageSelectors.getViewType(state, entityName),
        searchKeyword: pageSelectors.getSearchKeyword(state, entityName),
        isSearchActive: pageSelectors.isSearchActive(state, entityName),
        filters: pageSelectors.getFilters(state, entityName),
        selected: pageSelectors.getSelected(state, entityName),
        processing: pageSelectors.getProcessing(state, entityName),
        restoredQuery: isError ? '' : restoredQuery,
        currentQuery, page, limit, search, perPageOptions, filterStructure, filterParams, status, isError
    }
}

const mapDispatchToProps = entityName => dispatch => ({
    initializePage: (query, search, filterStructure, filterParams) => (
        dispatch(actions.initializePage(entityName, query, search, filterStructure, filterParams))
    ),
    removeEntitiesFromPage: (ids) => dispatch(actions.removeEntitiesFromPage(entityName, ids)),
    setActive: (isActive) => dispatch(actions.setActive(entityName, isActive)),
    changePage: (page, limit) => dispatch(actions.changePage(entityName, page, limit)),
    setViewType: (viewType) => dispatch(actions.setViewType(entityName, viewType)),
    setSearchKeyword: (keyword) => dispatch(actions.setSearchKeyword(entityName, keyword)),
    setFilters: (filters) => dispatch(actions.setFilters(entityName, filters)),
    confirmFilters: () => dispatch(actions.confirmFilters(entityName)),
    selectEntity: (id) => dispatch(actions.selectEntity(entityName, id)),
    selectMultiple: (ids) => dispatch(actions.selectMultiple(entityName, ids)),
});

export default ({ entityName, ...params }) => WrapperComponent => (
    connect(
        mapStateToProps(entityName, params),
        mapDispatchToProps(entityName)
    )(Container(WrapperComponent))
);
