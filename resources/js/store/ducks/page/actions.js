import types from './types';
import { action } from '~s/ducks/helpers';

export default {
    setViewType: (entity, viewType) => action(entity, types.SET_VIEWTYPE, viewType),
    setSearchKeyword: (entity, keyword) => action(entity, types.SET_SEARCH, keyword),
    setFilterItems: (entity, filters) => action(entity, types.SET_FILTERS, filters),
    setFiltersActive: (entity, isActive) => action(entity, types.SET_FILTERS_ACTIVE, isActive),
    setSelected: (entity, selected) => action(entity, types.SET_SELECTED, selected),
    setQuery: (entity, query) => action(entity, types.SET_QUERY, query),
    setStatus: (entity, statuses) => action(entity, types.SET_STATUS, statuses),
    setActive: (entity, isActive) => action(entity, types.SET_ACTIVE, isActive),
    setProcessing: (entity, isActive) => action(entity, types.SET_PROCESSING, isActive),
}



