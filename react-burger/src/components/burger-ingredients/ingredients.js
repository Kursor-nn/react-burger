import React from 'react';

//KIT Components 
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

// Styles
import styles from './ingredients.module.css';

//Components
import ProductList from '../product-list/product-list';

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('1')
    return (
        <div className={`pl-10 pt-20 ${styles.column}`}>
            <p className="text text_type_main-large"> Соберите бургер </p>
            <div style={{ display: 'flex' }}>
                <Tab value="1" active={current === '1'} onClick={setCurrent}>Булки</Tab>
                <Tab value="2" active={current === '2'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="3" active={current === '3'} onClick={setCurrent}>Начинки</Tab>
            </div>

            <div className={styles.scrollzone}>
                <ProductList listType={'bun'} />
                <ProductList listType={'main'} />
                <ProductList listType={'sauce'} />
            </div>

        </div>
    );
}

export default BurgerIngredients;