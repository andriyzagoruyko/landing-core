
import React from 'react';
import { connect } from 'react-redux';
import validate from '../form/validation'
import { reduxForm, initialize } from 'redux-form'
import ProductForm from '../form';

const addProduct = () => {
    return <ProductForm />
}

export default addProduct;