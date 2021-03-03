import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~s/modules/entity/thunks';
import * as selectors from '~s/modules/entity/selectors';

const useCollection = (entityName, query, ids = []) => {
    const dispatch = useDispatch();

    const readEntities = () =>
        dispatch(actions.readEntities(entityName, query, true));

    const entities = useSelector((state) =>
        selectors.getCollection(state, entityName, query),
    );

    const status = useSelector((state) =>
        selectors.getStatus(state, entityName, query),
    );

    const byArray = useSelector((state) =>
        selectors.getCollectionByArray(state, entityName, ids),
    );

    useEffect(() => {
        readEntities(query);
    }, []);

    return { entities, status, byArray, readEntities };
};

export default useCollection;
