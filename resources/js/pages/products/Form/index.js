import React, { useEffect, useState } from 'react';
import Form from './Layout'
import Page404 from '~p/errors/e404'
import EntitySinglePage from '~/hocs/EntitySinglePage'

//import ReadEntityContainer from '~/hocs/Entity/Read/Single';

const ProductForm = (props) => {
    const {
        updateProduct,
        createProduct,
        category,
        entity,
        isError,
    } = props;


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
            initialValues={entity}
            categories={category}
            onSubmit={handleSubmit}
        />
    );
}


export default EntitySinglePage({
    entityName: 'product',
    appends: ['category']
})(ProductForm);
