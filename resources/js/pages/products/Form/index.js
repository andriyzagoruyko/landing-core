import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct, updateProduct, createProduct } from '~s/actionCreators/products';
import { fetchCategoriesList } from '~s/actionCreators/categories'
import WithTitle from "~/hocs/WithTitle"
import Form from './Layout'
import Page404 from '~p/errors/e404'

const ProductForm = (props) => {
    const {
        updateProduct,
        fetchSingleProduct,
        fetchCategoriesList,
        createProduct,
        product,
        categories,
        isError,
        match
    } = props;

    const [productId, setProductId] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!categories.length) {
            fetchCategoriesList();
        }

        if (match.params.id) {
            const id = parseInt(match.params.id);
            setProductId(id);

            if (product.id != id) {
                fetchSingleProduct(id);
            }
        }
    }, []);

    const handleSubmit = data => {
        productId
            ? updateProduct(productId, data)
            : createProduct(data);
    }

    if (isError) {
        return <Page404 />
    }

    return (
        <Form
            isEdit
            categories={categories}
            initialValues={productId ? product : {}}
            onSubmit={handleSubmit}
        />
    );
}

const mapStateToProps = state => {
    return {
        product: state.products.single,
        categories: state.categories.items,
        isError: state.products.isSingleError,
    }
}

const ConnectedProductForm = connect(mapStateToProps, {
    fetchSingleProduct, updateProduct, fetchCategoriesList, createProduct
})(ProductForm);

export default WithTitle(ConnectedProductForm);
