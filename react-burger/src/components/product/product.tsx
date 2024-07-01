
//KIT Components
import {
    CurrencyIcon, Counter
} from '@ya.praktikum/react-developer-burger-ui-components';

//Styles
import styles from './product.module.css';

// React
import { useDrag } from 'react-dnd';
import { INGREDIENT_DND_TYPE } from '../utils/constants';
import { Link } from 'react-router-dom';
import cn from "classnames";
import { useLocation } from 'react-router-dom';


export interface ProductType {
    showDetails: () => void
    id: string
    count: number
    image: string
    name: string
    price: number
}

function Product({ showDetails, id, count, image, name, price }: ProductType) {
    const location = useLocation();

    const [_, dragRef] = useDrag({
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

export default Product;