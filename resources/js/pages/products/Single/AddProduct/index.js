import React from 'react';
import { connect } from 'react-redux';
import { createProduct } from '~s/actionCreators/products';
import FormLayout from '../Form'

const AddProduct = ({ createProduct }) => {
    return (
        <FormLayout onSubmit={(data => createProduct(data))} />
    );
}

export default connect(null, { createProduct })(AddProduct);
