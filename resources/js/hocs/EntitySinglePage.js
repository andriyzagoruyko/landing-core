import React, { useEffect, useState } from 'react';
import { parseQuery, stringifyQuery } from '~/helpers/query';
import { connect } from 'react-redux';
import { initializeFilter } from '~c/common/Filter';

/* Actions */
//import { readEntity, readEntities, removeEntities } from '~s/actionCreators/entity';

/* Selectors */
//import { selectReadEntities, selectEntityStatus, selectEntitySingle } from '~s/selectors/entity';
//import { selectMaxPages, selectTotal, selectViewType } from '~s/selectors/page';

import Page404 from '~p/errors/e404';

const Container = (WrapperComponent) => (props) => {
    const {
        history,
        isFetching,
        entityName,
        entity,
        readEntity,
        readEntities,
        relations,
        match,
        selectEntities,
        selectEntityStatus,
    } = props;

    //const [queryId, setQueryId] = useState(0);

    useEffect(() => {
        const id = parseInt(match.params.id);

        if (id && !entity) {
            readEntity(id);
        }

        if (relations.length) {
            relations.forEach(name => {
                if (!selectEntities(name).length) {
                    readEntities(name)
                }
            });
        }

        //return () => cleanEntities(entityName);
    }, []);


    /*if (status.error || (limit && perPageOptions && !perPageOptions.includes(limit))) {
        return <Page404 />
    }*/

    /*const data = {
        [entityName]: entity
    }*/


    /* if (!isFetching && entity) {
        isFetching = selectEntityStatus(entityName, queryId).isFetching;
    }*/


    console.log('isFetching', isFetching);

    return (
        <WrapperComponent entity={entity} {...props} />
    );
}

const getRelations = (state, relations) => {
    let data = { isFetching: false };

    relations.forEach(name => {
        data[name] = selectReadEntities(state, name);

        if (!data[name].length || selectEntityStatus(state, name).isFetching) {
            data.isFetching = true;
        }
    });

    return data;
}

const mapStateToProps = (entityName, { relations = [] }) => (state, props) => ({
    selectEntities: (entityName) => selectReadEntities(state, entityName),
    selectEntityStatus: (entityName, key) => selectEntityStatus(state, entityName, key),
    entity: selectEntitySingle(state, entityName, parseInt(props.match.params.id)),
    entities: selectReadEntities(state, entityName),
    entityName,
    relations,
    ...getRelations(state, relations)
});

const mapDispatchToProps = entityName => (dispatch, props) => {
    return {
        readEntity: (params) => dispatch(readEntity(entityName, params)),
        readEntities: (entityName) => dispatch(readEntities(entityName, '?page=1&limit=12')),
        removeEntities: (ids) => dispatch(removeEntities(entityName, ids)),
        cleanEntities: (entityName) => dispatch(cleanEntities(entityName))
    }
};

export default ({ entityName, ...params }) => WrapperComponent => (
    connect(
        mapStateToProps(entityName, params),
        mapDispatchToProps(entityName)
    )(Container(WrapperComponent))
);