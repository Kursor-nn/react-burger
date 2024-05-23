import React from 'react';
import data from '../../mock/mock-data.json';
import styles from './product-list.module.css';
import Product from "../product/product";
import PropTypes from 'prop-types';

const parts = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки'
};

class ProductList extends React.Component {
    render() {
        return (
            <>
                <p className={`mt-6 text text_type_main-medium ${styles.title}`}>{parts[this.props.listType]}</p>
                <div className={styles.list}>
                    {data.filter((itm) => itm.type == this.props.listType)
                    .map((itm) => <Product key={itm._id} image={itm.image} name={itm.name} price={itm.price} /> )}
                </div>
            </>
        )
    }
}

ProductList.propTypes = {
    listType: PropTypes.oneOf(Object.keys(parts)).isRequired
};

export default ProductList;