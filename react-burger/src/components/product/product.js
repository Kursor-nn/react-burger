
//KIT Components
import {
    CurrencyIcon, Counter
} from '@ya.praktikum/react-developer-burger-ui-components';

//Styles
import styles from './product.module.css';

//Type Check
import PropTypes from 'prop-types';

// React
import { useDrag } from 'react-dnd';
import { INGREDIENT_DND_TYPE } from '../utils/constants';

function Product({ showDetails, id, count, image, name, price }) {
    const [{ }, dragRef] = useDrag({
        type: INGREDIENT_DND_TYPE,
        item: { id: id }
    });

    return (
        <div ref={dragRef} className={styles.product} onClick={showDetails}>
            {count ? <Counter count={count} size="default" /> : <></>}
            <img src={image} alt={name} />
            <div className={styles.price}>
                <span>{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className={`text text_type_main-small ${styles.name}`}>
                {name}
            </span>
        </div>
    )
}

Product.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    showDetails: PropTypes.func.isRequired
};

export default Product;