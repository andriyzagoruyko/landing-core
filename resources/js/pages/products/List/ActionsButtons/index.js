import React from 'react';
import { connect } from 'react-redux'
import { removeProducts } from '~s/actionCreators/products'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ActionsButtons = ({ id, removeProducts }) => {

    const onClickEdit = () => {
        console.log('click Edit', id);
    }

    const onClickRemove = (id) => {
        removeProducts([id]);
    }

    return (
        <>
            <span style={{ cursor: 'pointer' }} role="button" aria-label="edit">
                <EditIcon color="primary" onClick={onClickEdit} />
            </span>

            <span style={{ cursor: 'pointer' }} role="button" aria-label="edit">
                <DeleteIcon color="secondary" onClick={() => onClickRemove(id)} />
            </span>
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        removeProducts: (id) => dispatch(removeProducts(id))
    }
}

export default React.memo(
    connect(
        null,
        mapDispatchToProps)(ActionsButtons)
)

