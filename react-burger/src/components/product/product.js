
//KIT Components
import {
    CurrencyIcon, Counter
} from '@ya.praktikum/react-developer-burger-ui-components';

//Styles
import styles from './product.module.css';

//Type Check
import PropTypes from 'prop-types';

function Product(props) {
    return (
        <div className={styles.product} onClick={props.showDetails}>
            {props.count ? <Counter count={props.count} size="default" /> : <></>}
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
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};

export default Product;