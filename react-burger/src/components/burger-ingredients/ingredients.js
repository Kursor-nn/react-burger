import React from 'react';

//KIT Components 
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

// Styles
import styles from './ingredients.module.css';

//Components
import ProductList from '../product-list/product-list';
import Product from '../product/product'

//Type Check
import PropTypes from 'prop-types';

function BurgerIngredients({ showIngredDetails, ingredients }) {
    const [current, setCurrent] = React.useState('bun')

    return (
        <div className={`pl-5 pt-20 ${styles.column}`}>
            <p className="text text_type_main-large">Соберите бургер</p>
            <div className={styles.source_head}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
            </div>

            <div className={styles.scrollzone}>
                <ProductList ingredients={ingredients} listType={'bun'} showDetails={showIngredDetails} />
                <ProductList ingredients={ingredients} listType={'sauce'} showDetails={showIngredDetails} />
                <ProductList ingredients={ingredients} listType={'main'} showDetails={showIngredDetails} />
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    showIngredDetails: PropTypes.func,
    ingredients: PropTypes.arrayOf(Product)
};

export default BurgerIngredients;