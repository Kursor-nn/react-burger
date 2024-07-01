import Product from "../product/product";
import { setCard } from '../../services/actions/cardActions';

//Redux
import { useDispatch } from 'react-redux';

//Style
import styles from './product-list.module.css';

// PropTypesß
import PropTypes from 'prop-types';
import { useTypedSelector } from "../../hooks/useTypedSelector";

const parts: { [id: string]: string } = {
    "bun": 'Булки',
    "sauce": 'Соусы',
    "main": 'Начинки'
};

interface ProductListType {
    listType: string,
    refs: any
}

export interface IngredientType {
    _id: string,
    index: number,
    uniqueId: string,
    image: string,
    name: string,
    price: number,
    type: string
    calories: number,
    proteins: number,
    fat: number,
    carbohydrates: number,
    image_large: string
}

export interface OrderType {
    _id: string,
}

function ProductList({ listType, refs }: ProductListType) {
    const dispatch = useDispatch();
    const ingredients: IngredientType[] = useTypedSelector<IngredientType[]>((state: any) => state.ingredients.ingredients)
    const order: OrderType[] = useTypedSelector<OrderType[]>((state: any) => state.order.order)

    function buildProduct(value: IngredientType, index: number) {
        const countOfIngr = order!.filter(it => it != null).filter(it => it._id === value._id).length
        return (
            <Product showDetails={() => dispatch(setCard(value))}
                count={countOfIngr}
                key={value._id}
                id={value._id}
                image={value.image}
                name={value.name}
                price={value.price}
            />
        );
    }

    const filteredIngredients = ingredients.filter((itm) => itm.type === listType)
    return (
        (filteredIngredients && filteredIngredients.length) ? <>
            <p className={`mt-6 text text_type_main-medium ${styles.title}`}>{parts[listType]}</p>
            <div id={listType} className={styles.list} ref={refs}>
                {filteredIngredients
                    .map((itm, index) => buildProduct(itm, index))}
            </div>
        </>
            : <></>

    )
}

ProductList.propTypes = {
    listType: PropTypes.oneOf(Object.keys(parts)).isRequired,
    refs: PropTypes.any
};

export default ProductList;