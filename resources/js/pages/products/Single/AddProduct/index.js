import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import WithTitle from "~/hocs/WithTitle"
import { createProduct } from '~s/actionCreators/products';
import FormLayout from '../Form'

const AddProduct = ({ createProduct }) => {
    return <FormLayout onSubmit={(data => createProduct(data))} />
}

const ConnectedAddProduct = connect(null,
    { createProduct }
)(AddProduct);

export default WithTitle(ConnectedAddProduct);
