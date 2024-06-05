import React from 'react';

// KIT Components 
import { Button, ConstructorElement, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Styles
import styles from './constructor.module.css';

// Mock Data
//import data from '../../mock/mock-data.json';

//Type Check
import PropTypes from 'prop-types';
import Product from '../product/product';

import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient } from '../../services/actions/orderActions';

function BurgerConstructor({ doOrder }) {
    const dispatch = useDispatch();
    const ingredients = useSelector((store) => store.ingredients.ingredients);
    const orderIngredients = useSelector((store) => store.order.order);
    const bun = ingredients.find(item => item.type === 'bun');

    const [{ isHover }, dropTargerRef] = useDrop({
        accept: "ingredient",
        collect: (monitor) => ({}),
        drop(item) {
            const newIngr = ingredients.filter(it => it._id == item.id)[0]
            dispatch(addIngredient(newIngr))
        },
    });

    return (
        <div className={`pt-20 ${styles.column}`}>

            {
                (bun && orderIngredients.lenght != 0) ?
                    <>
                        <div className={styles.header_box} />
                        <div className="pl-6">
                            <ConstructorElement key={bun._id} type="top" isLocked={true} text={bun.name + " (верх)"} price={bun.price} thumbnail={bun.image} />
                        </div>
                        <div className={styles.column_list} ref={dropTargerRef}>
                            {
                                orderIngredients.map((itm, index) => {
                                    return (
                                        <div key={index} className={styles.ingredient}>
                                            <DragIcon type="primary" />
                                            <ConstructorElement key={itm._id} text={itm.name} price={itm.price} thumbnail={itm.image} />
                                        </div>
                                    )
                                })}
                        </div>

                        <div className="pl-6">
                            <ConstructorElement key={bun._id} type="bottom" isLocked={true} text={bun.name + " (низ)"} price={bun.price} thumbnail={bun.image} />
                        </div>
                    </>
                    : <></>
            }

            <div className={styles.total}>
                <p className="text text_type_digits-medium">610</p>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="medium" onClick={doOrder}>Оформить заказ</Button>
            </div>
        </div>
    );
}

BurgerConstructor.propTypes = {
    doOrder: PropTypes.func,
    ingredients: PropTypes.arrayOf(Product)
};

export default BurgerConstructor;