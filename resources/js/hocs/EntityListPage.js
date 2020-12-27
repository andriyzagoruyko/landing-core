import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initializeFilter } from '~c/common/Filter';

/* Actions */
import entityActions from '~s/ducks/entity/operations';
import pageActions from '~s/ducks/page/operations';

/* Selectors */
import entitySelectors from '~s/ducks/entity/selectors';
import pageSelectors from '~s/ducks/page/selectors';

/* Components */
import Page404 from '~p/errors/e404';

const Container = (params, WrapperComponent) => (props) => {
    const {
        history,
        location,
        status,
        readEntities,
        setFilters,
        setSearchKeyword,
        setActive,
        query
    } = props;

    const { filterStructure, perPageOptions } = params
    const { page, limit, search = '', ...filterParams } = query.parsed;

    useEffect(() => {
        setActive(true);

        if (query.restored) {
            history.replace({ search: query.restored });
            return;
        }

        setFilters(initializeFilter(filterStructure, filterParams));
        setSearchKeyword(search);

        if (!status.result || status.shouldUpdate) {
            readEntities(query.current);
        }

        return () => setActive(false);
    }, [location]);

    if (status.error || (limit && perPageOptions && !perPageOptions.includes(limit))) {
        return <Page404 />
    }

    return (
        <WrapperComponent
            page={page}
            limit={limit}
            search={search}
            filterParams={filterParams}
            perPageOptions={perPageOptions}
            {...props}
        />
    );
}

const mapStateToProps = (entityName, { initialParams, restoreOnBack, restoreAlways }) => state => {
    const query = pageSelectors.getQueryAndParams(state, entityName, restoreOnBack, restoreAlways, initialParams);

    return {
        entities: entitySelectors.getCollection(state, entityName, query.saved),
        status: entitySelectors.getStatus(state, entityName, query.current),
        viewType: pageSelectors.getViewType(state, entityName),
        searchKeyword: pageSelectors.getSearchKeyword(state, entityName),
        isSearchActive: pageSelectors.isSearchActive(state, entityName),
        filters: pageSelectors.getFilters(state, entityName),
        selected: pageSelectors.getSelected(state, entityName),
        maxPages: pageSelectors.getStatusMaxPages(state, entityName, query.saved),
        total: pageSelectors.getStatusTotal(state, entityName, query.saved),
        query
    }
}

const mapDispatchToProps = entityName => dispatch => {
    return {
        readEntities: (params) => dispatch(entityActions.readEntities(entityName, params)),
        removeEntities: (ids) => dispatch(entityActions.removeEntities(entityName, ids)),
        setViewType: (viewType) => dispatch(pageActions.setViewType(entityName, viewType)),
        changePage: (page, limit) => dispatch(pageActions.changePage(entityName, page, limit)),
        setSearchKeyword: (keyword) => dispatch(pageActions.setSearchKeyword(entityName, keyword)),
        setFilters: (filters) => dispatch(pageActions.setFilters(entityName, filters)),
        confirmFilters: () => dispatch(pageActions.confirmFilters(entityName)),
        selectEntity: (id) => dispatch(pageActions.selectEntity(entityName, id)),
        selectMultiple: (ids) => dispatch(pageActions.selectMultiple(entityName, ids)),
        removeEntitiesFromPage: (ids) => dispatch(pageActions.removeEntitiesFromPage(entityName, ids)),
        setActive: (isActive) => dispatch(pageActions.setActive(entityName, isActive)),
    }
}

export default ({ entityName, ...params }) => WrapperComponent => (
    connect(
        mapStateToProps(entityName, params),
        mapDispatchToProps(entityName)
    )(Container(params, WrapperComponent))
);
