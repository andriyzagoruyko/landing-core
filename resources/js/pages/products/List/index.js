import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { fetchProducts, removeProducts } from '~s/actionCreators/products'
import { urlBuilder } from '~/routes';
import Link from '~c/Link'
import Table from '~c/Table'
import tableStructure from './tableStructure'

const ProductsList = ({ products, isLoading, fetchProducts, removeProducts }) => {
    const noProducts = (
        <>
            {"No products has been added. "}
            <Link to={urlBuilder('productsAdd')}>
                Click to add
            </Link>
        </>
    );

    useEffect(() => {
        !products.length && fetchProducts();
    }, []);

    return (
        <>

            <Table
                columns={tableStructure}
                rows={products}
                perPage={8}
                checkbox
                searchPlaceholder="Search by name and article"
                onClickRemoveFew={(products) => removeProducts(products.map(({ id }) => id))}
                empty={isLoading ? 'Loading...' : noProducts}
                aria-label="products table"
            />
        </>
    )
}


const mapStateToProps = state => {
    return {
        isLoading: state.app.isLoading,
        products: state.products.products,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        removeProducts: (id) => dispatch(removeProducts(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);