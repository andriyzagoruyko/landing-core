import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import actions from '~s/ducks/page/operations';
import { push } from 'connected-react-router';

/* Selectors */
import selectors from '~s/ducks/page/selectors';
import entitySelectors from '~s/ducks/entity/selectors';

const Container = (WrapperComponent) => (props) => <WrapperComponent {...props} />

const mapStateToProps = (entityName, {perPageOptions, filterStructure, tableCreator, ...hoc}) => state => {
    const query = selectors.getQueryAndParams(
        state, entityName, hoc.paramsRestoreOnBack, hoc.paramsRestoreAlways, hoc.initialParams
    );

    const { params, savedQuery, restoredQuery, currentQuery } = query;
    const { page, limit, search = '', ...filterParams } = params;
    const status = entitySelectors.getStatus(state, entityName, currentQuery);
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
        restoredQuery: isError ? '' : restoredQuery,
        currentQuery, page, limit, search, perPageOptions, filterStructure, filterParams, status, isError, tableCreator
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
    push: (location) => dispatch(push(location))
});

export default ({ entityName, ...params }) => WrapperComponent => (
    connect(
        mapStateToProps(entityName, params),
        mapDispatchToProps(entityName)
    )(Container(WrapperComponent))
);
