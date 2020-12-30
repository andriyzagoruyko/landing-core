import { composeType } from '~s/ducks/helpers'
import types from './types'

const setPageProps = (entityName, props) => {
    return {
        type: composeType(types.SET_PROPS, entityName),
        payload: { ...props },
        meta: { entityName },
    }
}

const setViewType = (entityName, viewType) => ({
    type: composeType(types.SET_VIEWTYPE, entityName),
    payload: viewType
});

const setSearchKeyword = (entityName, keyword) => ({
    type: composeType(types.SET_SEARCH, entityName),
    payload: keyword
});

const setFilterItems = (entityName, filters) => ({
    type: composeType(types.SET_FILTERS, entityName),
    payload: filters
});

const setFiltersActive = (entityName, isActive) => ({
    type: composeType(types.SET_FILTERS_ACTIVE, entityName),
    payload: isActive
});

const setSelected = (entityName, selected) => ({
    type: composeType(types.SET_SELECTED, entityName),
    payload: selected,
});

const setQuery = (entityName, query) => ({
    type: composeType(types.SET_QUERY, entityName),
    payload: query,
});

const setStatus = (entityName, statuses) => ({
    type: composeType(types.SET_STATUS, entityName),
    payload: statuses,
});

const setActive = (entityName, isActive) => ({
    type: composeType(types.SET_ACTIVE, entityName),
    payload: isActive,
});

const setProcessing = (entityName, isActive) => ({
    type: composeType(types.SET_PROCESSING, entityName),
    payload: isActive,
});

export default {
    setPageProps,
    setViewType,
    setSearchKeyword,
    setFilterItems,
    setFiltersActive,
    setSelected,
    setQuery,
    setStatus,
    setActive,
    setProcessing
}
