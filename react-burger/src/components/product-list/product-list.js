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
                <div className={styles.list}>
                    {data.map((itm) => {
                        return <Product key={itm._id} image={itm.image} name={itm.name} price={itm.price} />
                    })}
                </div>
            </>
        )
    }
}

Product.propTypes = {
    listType: PropTypes.oneOf(parts.keys).isRequired
};

export default ProductList;