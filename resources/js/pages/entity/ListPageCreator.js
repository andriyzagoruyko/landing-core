import React, { useCallback, useMemo } from 'react';
import ListPage from './ListPage';
import EntityListContainer from '~/hocs/Containers/EntityList';

export default (settings) => EntityListContainer(settings)(ListPage);