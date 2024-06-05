import styles from './product-list.module.css';
import Product from "../product/product";
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { setCard } from '../../services/actions/cardActions';

const parts = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки'
};

function ProductList({ listType }) {
    const dispatch = useDispatch();
    const selectedTab = useSelector((state) => state.ingredients.tab)
    const ingredients = useSelector((state) => state.ingredients.ingredients)
    const order = useSelector((state) => state.order.order)

    function buildProduct(value, index) {
        const countOfIngr = order.filter(it => it._id === value._id).length
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

    const filteredIngredients = ingredients.filter((itm) => itm.type == listType)
    return (
        ((selectedTab == null || selectedTab === listType) && filteredIngredients && filteredIngredients.length) ? <>
            <p className={`mt-6 text text_type_main-medium ${styles.title}`}>{parts[listType]}</p>
            <div className={styles.list}>
                {filteredIngredients
                    .map((itm, index) => buildProduct(itm, index))}
            </div>
        </>
            : <></>

    )
}

ProductList.propTypes = {
    listType: PropTypes.oneOf(Object.keys(parts)).isRequired
};

export default ProductList;