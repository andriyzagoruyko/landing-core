import React from 'react';
import { reduxForm, initialize } from 'redux-form'
import { connect } from 'react-redux';
import { createProduct } from '~s/actionCreators/products'
import { Container } from '@material-ui/core/';
import validate from './validation'
import Form from '~c/Form/'
import formStructure from './formStructure'
import { useHistory } from "react-router-dom";
import { urlBuilder } from "~/routes";

const ProductForm = ({ handleSubmit, createProduct }) => {
    const history = useHistory();

    const submit = async (data) => {
        await createProduct(data);
        history.push(urlBuilder('products'));
    }

    return (
            <Form formStructure={formStructure} onSubmit={handleSubmit(submit)} />
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.products.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createProduct: (data) => dispatch(createProduct(data))
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(ProductForm);

export default reduxForm({ form: 'ProductForm', validate, })(Connected)
