import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Actions */
import actions from '~s/ducks/page/operations';
import entityActions from '~s/ducks/entity/operations';

/* Selectors */
import entitySelectors from '~s/ducks/entity/selectors';
import pageSelectors from '~s/ducks/page/selectors';

/* Components */
import Page404 from '~p/errors/e404';
import Loader from '~c/Preloader';

const Container = (WrapperComponent) => ({
    isError,
    ...props
}) => {
    const { match, entity, readEntity } = props;

    useEffect(() => {
        const id = parseInt(match.params.id);

        if (id && !entity) {
            readEntity(id);
        }
    }, []);

    return <WrapperComponent {...props} />
}

const mapStateToProps = (entityName, hocParams) => (state, props) => {
    return {
        entity: entitySelectors.getEntity(state, entityName, parseInt(props.match.params.id)),
    }
}

const mapDispatchToProps = entityName => dispatch => ({
    readEntity: (params) => dispatch(entityActions.readEntity(entityName, params)),
    cleanEntitiesStatus: (entityName) => dispatch(entityActions.cleanEntitiesStatus(entityName))
});

export default ({ entityName, ...params }) => WrapperComponent => (
    connect(
        mapStateToProps(entityName, params),
        mapDispatchToProps(entityName)
    )(Container(WrapperComponent))
);
