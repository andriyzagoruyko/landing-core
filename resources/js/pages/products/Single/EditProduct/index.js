import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct, updateProduct } from '~s/actionCreators/products';
import FormLayout from '../Form'
import Page404 from '~p/errors/e404'

const EditProduct = ({ updateProduct, fetchSingleProduct, product, isError, match }) => {
    const [productId, setProductId] = useState(0);

    useEffect(() => {
        if (match.params.id) {
            const id = parseInt(match.params.id);
            setProductId(id);

            if (product.id != id) {
                fetchSingleProduct(id);
            }
        }
    }, []);

    const handleSubmit = (data) => {
        if (productId) {
            updateProduct(productId, data);
        }
    }

    if (isError) {
        return <Page404 />
    }

    return (
        <FormLayout
            isEdit
            initialValues={product}
            onSubmit={handleSubmit}
        />
    );
}

const mapStateToProps = state => {
    return {
        product: state.products.single,
        isError: state.products.isSingleError,
        location: state.router.location
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
        updateProduct: (id, data) => dispatch(updateProduct(id, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
