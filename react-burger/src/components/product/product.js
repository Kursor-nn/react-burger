import React from 'react';

//KIT Components
import {
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

//Styles
import styles from './product.module.css';

//Type Check
import PropTypes from 'prop-types';

function Product(props) {
    return (
        <div className={styles.product}>
            <img src={props.image} alt={props.name} />
            <div className={styles.price}>
                <span>{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className={`text text_type_main-small ${styles.name}`}>
                {props.name}
            </span>
        </div>
    )
}

Product.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
};

export default Product;