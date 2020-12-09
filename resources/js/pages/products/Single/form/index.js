import React, { useEffect, useState } from 'react';
import { reduxForm, initialize } from 'redux-form'
import { connect } from 'react-redux';
import { createProduct } from '~s/actionCreators/products'
import validate from './validation'
import Form from '~c/common/Form/'
import formStructure from './formStructure'
import { useHistory } from "react-router-dom";
import { urlBuilder } from "~/routes";
import { toNumber } from 'lodash';
import { fetchProducts } from '~s/actionCreators/products'


const ProductForm = ({ handleSubmit, createProduct, products, fetchProducts, initializeForm, ...props }) => {
    const history = useHistory();
    let isEdit = false;
    const id = toNumber(props.match.params.id);

    const [product, setProduct] = useState();

    useEffect(() => {
        if (id && !products.length) {
            fetchProducts();
        }
    }, []);

    if (id) {
        if (products.length) {
            const index = products.findIndex(item => item.id == id);
            console.log(index);

            if (index != -1) {
                initializeForm(products[index]);
            }
        }
    }

 


    const submit = async (data) => {
        await createProduct(data);
        history.push(urlBuilder('products'));
    }

    return (
        <Form
            formStructure={formStructure}
            onSubmit={handleSubmit(submit)}
        />
    );
}

const mapStateToProps = state => {
    return {
        products: state.products.products,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        createProduct: (data) => dispatch(createProduct(data)),
        initializeForm: (product) => dispatch(initialize('ProductForm', product))
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(ProductForm);
export default reduxForm({ form: 'ProductForm', validate, })(Connected)
