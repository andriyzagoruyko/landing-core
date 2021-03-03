import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { plural } from '~/helpers';

/* Actions */
import actions from '~s/modules/page/thunks';

/* Selectors */
import selectors from '~s/modules/page/selectors';
import * as entitySelectors from '~s/modules/entity/selectors';

import Loader from '~c/common/Preloader';
import { useLocation } from 'react-router-dom';
import ErrorHandler from '~/components/common/ErrorHandler/';

const Container = (WrappedComponent) => ({
    query,
    restoredQuery,
    filterParams,
    filterStructure,
    initializePage,
    setActive,
    currentParams,
    initialParams,
    ...props
}) => {
    const { processing, search, defaultViewType, isError } = props;
    const location = useLocation();

    useEffect(() => {
        setActive(true);
        return () => setActive(false);
    }, []);

    useEffect(() => {
        initializePage({
            query,
            currentParams,
            initialParams,
            search,
            defaultViewType,
            filterStructure,
        });
    }, [location]);

    return (
        <ErrorHandler isError={isError}>
            {processing && <Loader />}
            <WrappedComponent {...props} />
        </ErrorHandler>
    );
};

const mapStateToProps = (entityName, hocParams) => (state) => {
    const {
        perPageOptions = [12, 36, 60],
        initialParams = { page: 1, limit: perPageOptions[0] },
        viewTypes = [],
        defaultViewType = viewTypes.length ? viewTypes[0] : null,
        searchPlaceholder,
        filterStructure,
        component: Layout,
    } = hocParams;

    const {
        params,
        savedQuery,
        currentQuery,
    } = selectors.getQueryAndParams(state, entityName);

    const { page, limit, search = '' } = params;

    const status = entitySelectors.getStatus(
        state,
        entityName,
        currentQuery,
        'get',
    );

    const isError =
        status.error ||
        (limit && perPageOptions && !perPageOptions.includes(limit));

    return {
        entities: entitySelectors.getCollection(
            state,
            entityName,
            savedQuery,
        ),
        maxPages: selectors.getMaxPages(
            state,
            entityName,
            savedQuery,
        ),
        viewTypes,
        total: selectors.getTotal(state, entityName, savedQuery),
        viewType: selectors.getViewType(state, entityName),
        searchKeyword: selectors.getSearchKeyword(state, entityName),
        isSearchActive: selectors.isSearchActive(state, entityName),
        filters: selectors.getFilters(state, entityName),
        selected: selectors.getSelected(state, entityName),
        processing: selectors.getProcessing(state, entityName),
        entityName,
        query: currentQuery,
        defaultViewType,
        page,
        limit,
        search,
        perPageOptions,
        filterStructure,
        status,
        isError,
        searchPlaceholder,
        initialParams,
        currentParams: params,
        Layout,
    };
};

const mapDispatchToProps = (entityName) => (dispatch) => ({
    initializePage: (params) =>
        dispatch(actions.initializePage(entityName, params)),
    removeEntitiesFromPage: (ids) =>
        dispatch(actions.removeEntitiesFromPage(entityName, ids)),
    setActive: (isActive) =>
        dispatch(actions.setActive(entityName, isActive)),
    changePage: (page, limit) =>
        dispatch(actions.changePage(entityName, page, limit)),
    setViewType: (viewType) =>
        dispatch(actions.setViewType(entityName, viewType)),
    setSearchKeyword: (keyword) =>
        dispatch(actions.setSearch(entityName, keyword)),
    setFilters: (filters) =>
        dispatch(actions.setFilters(entityName, filters)),
    confirmFilters: () =>
        dispatch(actions.confirmFilters(entityName)),
    selectEntity: (id) =>
        dispatch(actions.selectEntity(entityName, id)),
    selectMultiple: (ids) =>
        dispatch(actions.selectMultiple(entityName, ids)),
    setQuery: (query) =>
        dispatch(actions.setQuery(entityName, query)),
});

const Connected = ({ entityName, ...params }) => (WrappedComponent) =>
    compose(
        connect(
            mapStateToProps(entityName, params),
            mapDispatchToProps(entityName),
        ),
        Container,
    )(WrappedComponent);

export default Connected;
