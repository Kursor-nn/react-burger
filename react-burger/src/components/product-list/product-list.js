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

function ProductList({ ingredients, listType }) {
    const dispatch = useDispatch();
    const selectedTab = useSelector((state) => state.ingredients.tab)

    function buildProduct(product, index) {
        return (
            <Product showDetails={() => dispatch(setCard(product))}
                count={index == 0 ? 1 : 0}
                key={product._id}
                image={product.image}
                name={product.name}
                price={product.price} />);
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
    listType: PropTypes.oneOf(Object.keys(parts)).isRequired,
    ingredients: PropTypes.arrayOf(Product)
};

export default ProductList;