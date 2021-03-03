import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomKey } from '~/helpers/index';
import * as actions from '~s/modules/entity/thunks';
import * as selectors from '~s/modules/entity/selectors';

const useEntity = (entityName, id) => {
    const dispatch = useDispatch();
    const [uuid] = useState(getRandomKey());

    const readEntity = (query) =>
        dispatch(actions.readEntities(entityName, query, false));

    const updateOrCreate = (data) =>
        dispatch(
            actions.updateOrCreateEntity(entityName, data, uuid),
        );

    const entity = useSelector((state) =>
        selectors.getEntity(state, entityName, id),
    );

    const status = useSelector((state) =>
        selectors.getStatus(state, entityName, id || uuid),
    );

    useEffect(() => {
        id && readEntity(id);
    }, []);

    return { entity, status, updateOrCreate, readEntity };
};

export default useEntity;
