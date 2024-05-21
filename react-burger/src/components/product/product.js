import React from 'react';

//KIT Components
import {
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

//Styles
import styles from './product.module.css';

//Type Check
import PropTypes from 'prop-types';

class Product extends React.Component {
    render() {
        return (
            <div className={styles.product}>
                <img src={this.props.image} alt={this.props.name} />
                <div className={styles.price}>
                    <span>{this.props.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span className={styles.name}>
                    {this.props.name}
                </span>
            </div>
        )
    }
}

Product.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
};

export default Product;