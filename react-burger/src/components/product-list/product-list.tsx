import Product from "../product/product";
import { setCard } from '../../services/actions/cardActions';

//Style
import styles from './product-list.module.css';

// PropTypesß
import PropTypes from 'prop-types';
import {useAppDispatch, useTypedSelector} from "../../hooks/useTypedSelector";
import {RootState} from "../../services/init";

const parts: { [id: string]: string } = {
    "bun": 'Булки',
    "sauce": 'Соусы',
    "main": 'Начинки'
};

interface ProductListType {
    listType: string,
    refs: React.RefObject<HTMLHeadingElement>
}

export interface IngredientType {
    _id: string | null | undefined,
    count: number | null | undefined,
    index: number | null | undefined,
    uniqueId: string | null | undefined,
    image: string | null | undefined,
    name: string | null,
    price: number | null,
    type: string | null,
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
    const dispatch = useAppDispatch();
    const ingredients: IngredientType[] = useTypedSelector<IngredientType[]>((state: RootState) => state.ingredients.ingredients)
    const order = useTypedSelector((state: RootState) => state.order.order)

    function buildProduct(value: IngredientType, index: number) {
        const countOfIngr = order!.filter(it => it != null).filter(it => it!._id === value._id).length
        return (
            <Product showDetails={() => dispatch(setCard(value))}
                count={countOfIngr}
                key={value._id}
                id={value._id}
                image={value.image!!}
                name={value.name!!}
                price={value.price!!}
                ingType={value.type}
                position={index}
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