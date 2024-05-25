import styles from './product-list.module.css';
import Product from "../product/product";
import PropTypes from 'prop-types';

const parts = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки'
};

function ProductList({ ingredients, showDetails, listType }) {
    function buildProduct(product, index) {
        return (
            <Product showDetails={() => showDetails(product)}
                count={index == 0 ? 1 : 0}
                key={product._id}
                image={product.image}
                name={product.name}
                price={product.price} />);
    }

    return (
        <>
            <p className={`mt-6 text text_type_main-medium ${styles.title}`}>{parts[listType]}</p>
            <div className={styles.list}>
                {ingredients.filter((itm) => itm.type == listType)
                    .map((itm, index) => buildProduct(itm, index))}
            </div>
        </>
    )
}

ProductList.propTypes = {
    listType: PropTypes.oneOf(Object.keys(parts)).isRequired
};

export default ProductList;