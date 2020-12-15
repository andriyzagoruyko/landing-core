import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { removeProducts, editProduct } from '~s/actionCreators/products';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ActionsButtons = ({ id, removeProducts, editProduct }) => {

    const onClickEdit = (id) => {
        editProduct(id);
    }

    const onClickRemove = (id) => {
        removeProducts([id]);
    }

    return (
        <>
            <IconButton size="small" aria-label="edit" onClick={() => onClickEdit(id)}>
                <EditIcon color="primary" />
            </IconButton>

            <IconButton size="small" aria-label="edit" onClick={() => onClickRemove(id)} >
                <DeleteIcon color="secondary" />
            </IconButton>
        </>
    );
};

const mapStateToProps = state => {
    return {
        history: state.router.history,
        products: state.products.items,
    }
}

export default React.memo(
    connect(mapStateToProps, { removeProducts, push, editProduct })(ActionsButtons)
)

