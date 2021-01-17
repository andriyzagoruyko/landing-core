import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { plural } from '~/helpers';

/* Actions */
import actions from '~s/ducks/page/thunks';

/* Selectors */
import selectors from '~s/ducks/page/selectors';
import entitySelectors from '~s/ducks/entity/selectors';

/* hocs */
import withError from '~/hocs/entity/withError';

import useTitle from '~/hooks/useTitle';
import Loader from '~c/common/Preloader';
import viewTypeItems from '../viewTypes';

const Container = (WrappedComponent) => ({
    query,
    restoredQuery,
    filterParams,
    filterStructure,
    initializePage,
    setActive,
    ...props
}) => {
    const { location, processing, title, search, defaultViewType } = props;

    useTitle(title);

    useEffect(() => {
        setActive(true);
        return () => setActive(false);
    }, []);

    useEffect(() => {
        initializePage({ query, restoredQuery, search, defaultViewType, filterStructure, filterParams });
    }, [location]);

    return (
        <>
            {processing && <Loader />}
            <WrappedComponent {...props} />
        </>
    );
}

const mapStateToProps = (entityName, hocParams) => state => {
    const {
        paramsRestoreOnBack = true,
        paramsRestoreAlways = ['limit'],
        perPageOptions = [12, 36, 60],
        initialParams = { page: 1, limit: perPageOptions[0] },
        availableViews = ['table', 'grid'],
        defaultViewType = availableViews[0],
        filterStructure,
        baseRoute = plural(entityName),
        searchPlaceholder,
        component: Layout
    } = hocParams;

    const query = selectors.getQueryAndParams(
        state, entityName, paramsRestoreOnBack, paramsRestoreAlways, initialParams
    );

    const { params, savedQuery, restoredQuery, currentQuery } = query;
    const { page, limit, search = '', ...filterParams } = params;
    const status = entitySelectors.getStatus(state, entityName, currentQuery || restoredQuery);
    const isError = status.error || (limit && perPageOptions && !perPageOptions.includes(limit));

    return {
        entities: entitySelectors.getCollection(state, entityName, savedQuery),
        maxPages: selectors.getMaxPages(state, entityName, savedQuery),
        total: selectors.getTotal(state, entityName, savedQuery),
        viewType: selectors.getViewType(state, entityName),
        searchKeyword: selectors.getSearchKeyword(state, entityName),
        isSearchActive: selectors.isSearchActive(state, entityName),
        filters: selectors.getFilters(state, entityName),
        selected: selectors.getSelected(state, entityName),
        processing: selectors.getProcessing(state, entityName),
        restoredQuery: isError ? '' : restoredQuery, entityName,
        query: currentQuery || restoredQuery,
        viewTypeItems: viewTypeItems.filter(item => availableViews.includes(item.name)),
        defaultViewType, page, limit, search, perPageOptions, filterStructure,
        filterParams, status, isError, Layout, baseRoute, searchPlaceholder,
    }
}

const mapDispatchToProps = entityName => dispatch => ({
    initializePage: (params) => dispatch(actions.initializePage(entityName, params)),
    removeEntitiesFromPage: (ids) => dispatch(actions.removeEntitiesFromPage(entityName, ids)),
    setActive: (isActive) => dispatch(actions.setActive(entityName, isActive)),
    changePage: (page, limit) => dispatch(actions.changePage(entityName, page, limit)),
    setViewType: (viewType) => dispatch(actions.setViewType(entityName, viewType)),
    setSearchKeyword: (keyword) => dispatch(actions.setSearch(entityName, keyword)),
    setFilters: (filters) => dispatch(actions.setFilters(entityName, filters)),
    confirmFilters: () => dispatch(actions.confirmFilters(entityName)),
    selectEntity: (id) => dispatch(actions.selectEntity(entityName, id)),
    selectMultiple: (ids) => dispatch(actions.selectMultiple(entityName, ids)),
    setQuery: (query) => dispatch(actions.setQuery(entityName, query))
});

const Connected = ({ entityName, ...params }) => WrappedComponent => compose(
    connect(mapStateToProps(entityName, params), mapDispatchToProps(entityName)),
    Container,
    withError,
)(WrappedComponent);

export default Connected;