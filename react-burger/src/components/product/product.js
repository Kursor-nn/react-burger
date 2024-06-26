
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
import { Link, useParams } from 'react-router-dom';
import cn from "classnames";
import { useLocation } from 'react-router-dom';


function Product({ showDetails, id, count, image, name, price }) {
    const location = useLocation();

    const [{ }, dragRef] = useDrag({
        type: INGREDIENT_DND_TYPE,
        item: { id: id }
    });

    return (
        <Link key={id} to={`/ingredients/${id}`} className={cn("", styles.link)} state={{ background: location }} >
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
        </Link>
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