import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import WithTitle from "~/hocs/WithTitle"
import { fetchSingleProduct, updateProduct } from '~s/actionCreators/products';
import FormLayout from '../Form'
import Page404 from '~p/errors/e404'

const EditProduct = (props) => {
    const {
        updateProduct,
        fetchSingleProduct,
        product,
        isError,
        match
    } = props;

    const [productId, setProductId] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);

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

const ConnectedEditProduct = connect(mapStateToProps, {
    fetchSingleProduct, updateProduct
})(EditProduct);

export default WithTitle(ConnectedEditProduct);
