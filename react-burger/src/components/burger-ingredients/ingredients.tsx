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

import { useDispatch, connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: any) => ({
    ingredients: state.ingredients.ingredients,
    current: state.ingredients.tab
});

const connector = connect(mapStateToProps);
type IngredientModalProps = {} & ConnectedProps<typeof connector>;

function BurgerIngredients({ ingredients, current }: IngredientModalProps) {
    const dispatch = useDispatch();

    return (
        <div className={`pl-5 pt-20 ${styles.column}`}>
            <p className="text text_type_main-large">Соберите бургер</p>
            <div className={styles.source_head}>
                <Tab value="bun" active={current === 'bun'} onClick={(value) => dispatch(setTab(value))}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={(value) => dispatch(setTab(value))}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={(value) => dispatch(setTab(value))}>Начинки</Tab>
            </div>

            <div className={styles.scrollzone}>
                <ProductList ingredients={ingredients} listType={'bun'} />
                <ProductList ingredients={ingredients} listType={'sauce'} />
                <ProductList ingredients={ingredients} listType={'main'} />
            </div>
        </div>
    );
}

export default connector(BurgerIngredients);