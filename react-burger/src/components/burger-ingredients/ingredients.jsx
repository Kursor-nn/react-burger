import React, { useEffect } from 'react';

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
import { useRef } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

function BurgerIngredients() {
    const dispatch = useDispatch();
    const currentTub = useSelector((state) => state.ingredients.tab);

    const bunRef = useRef(null);
    const sauseRef = useRef(null);
    const mainRef = useRef(null);
    const containerRef = useRef(null);

    const handleScroll = () => {
        const bunDist = Math.abs(containerRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
        const sauceDist = Math.abs(containerRef.current.getBoundingClientRect().top - sauseRef.current.getBoundingClientRect().top)
        const mainDist = Math.abs(containerRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
        const minDist = Math.min(bunDist, sauceDist, mainDist);

        const currentHeader = minDist === bunDist ? 'bun' : minDist === sauceDist ? 'sauce' : 'main';

        if (currentTub != currentHeader) {
            dispatch(setTab(currentHeader))
        }
    }

    const handleClick = (refTitle, value) => {
        refTitle.current?.scrollIntoView({
            behavior: "smooth",
        });
        dispatch(setTab(value))
    }

    return (
        <div className={`pl-5 pt-20 ${styles.column}`} ref={containerRef}>
            <p className="text text_type_main-large">Соберите бургер</p>
            <div className={styles.source_head}>
                <Tab value="bun" active={currentTub === 'bun'} onClick={(value) => (handleClick(bunRef, value))}>Булки</Tab>
                <Tab value="sauce" active={currentTub === 'sauce'} onClick={(value) => (handleClick(sauseRef, value))}>Соусы</Tab>
                <Tab value="main" active={currentTub === 'main'} onClick={(value) => (handleClick(mainRef, value))}>Начинки</Tab>
            </div>

            <div className={styles.scrollzone} onScroll={handleScroll}>
                <ProductList listType={'bun'} refs={bunRef} />
                <ProductList listType={'sauce'} refs={sauseRef} />
                <ProductList listType={'main'} refs={mainRef} />
            </div>
        </div>
    );
}

export default BurgerIngredients;