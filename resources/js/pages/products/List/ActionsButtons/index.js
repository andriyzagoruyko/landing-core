import React from 'react';
import { connect } from 'react-redux'
import { removeProducts } from '~s/actionCreators/products'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const ActionsButtons = ({ id, removeProducts }) => {
    const onClickEdit = () => {
        console.log('click Edit', id);
    }

    return (
        <>
            <span style={{ cursor: 'pointer' }} role="button" aria-label="edit">
                <EditIcon color="primary" onClick={onClickEdit} />
            </span>

            <span style={{ cursor: 'pointer' }} role="button" aria-label="edit">
                <DeleteIcon color="secondary" onClick={() => removeProducts(id)} />
            </span>
        </>
    );
};

const mapStateToProps = state => {
    return {
        products: state.products.products,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeProducts: (id) => dispatch(removeProducts(id)),
    }
}

export default React.memo(
    connect(
        mapStateToProps,
        mapDispatchToProps)(ActionsButtons)
)

