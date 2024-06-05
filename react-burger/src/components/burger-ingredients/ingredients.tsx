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
import { setTab } from '../../services/actions/ingredientsActions';

import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

function BurgerIngredients() {
    const dispatch = useDispatch();

    const ingredients = useSelector((state: any) => state.ingredients.ingredients);
    const currentTub = useSelector((state: any) => state.ingredients.tab);

    return (
        <div className={`pl-5 pt-20 ${styles.column}`}>
            <p className="text text_type_main-large">Соберите бургер</p>
            <div className={styles.source_head}>
                <Tab key="bun" value="bun" active={currentTub === 'bun'} onClick={(value) => dispatch(setTab(value))}>Булки</Tab>
                <Tab key="sauce" value="sauce" active={currentTub === 'sauce'} onClick={(value) => dispatch(setTab(value))}>Соусы</Tab>
                <Tab key="main" value="main" active={currentTub === 'main'} onClick={(value) => dispatch(setTab(value))}>Начинки</Tab>
            </div>

            <div className={styles.scrollzone}>
                <ProductList listType={'bun'} />
                <ProductList listType={'sauce'} />
                <ProductList listType={'main'} />
            </div>
        </div>
    );
}

export default BurgerIngredients;