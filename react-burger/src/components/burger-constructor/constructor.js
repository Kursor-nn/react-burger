import React from 'react';

// KIT Components 
import { Button, ConstructorElement, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Styles
import styles from './constructor.module.css';

// Mock Data
//import data from '../../mock/mock-data.json';

import { doOrderFrom } from '../api/backend-api';

//Type Check
import PropTypes from 'prop-types';
import Product from '../product/product';
import { useDrag } from 'react-dnd';

import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, deleteIngredientByPosition, setBun } from '../../services/actions/orderActions';
import ConstructorItem from './item';

function BurgerConstructor() {
    const dispatch = useDispatch();
    const ingredients = useSelector((store) => store.ingredients.ingredients);
    const orderIngredients = useSelector((store) => store.order.order);
    const bun = useSelector((store) => store.order.bun);
    const middleIngredients = orderIngredients.filter(item => item.type != 'bun')

    const [{ }, dropTargerRef] = useDrop({
        accept: "ingredient",
        collect: (monitor) => ({}),
        drop(item) {
            const newIngr = ingredients.filter(it => it._id == item.id)[0]
            if (newIngr.type == 'bun') {
                dispatch(setBun(newIngr))
            } else {
                dispatch(addIngredient(newIngr))
            }
        },
    });

    const orderCost = orderIngredients.map(it => it.price).reduce((a, b) => a + b, 0) + (bun == null ? 0 : 2 * bun.price)

    function buildRow(value, index) {
        return (
            <ConstructorItem key={index} value={value} index={index} />
        )
    }

    return (
        <div className={`pt-20 ${styles.column}`}>
            {
                (middleIngredients.lenght != 0) ?
                    <>
                        <div className={styles.header_box} />
                        <div className="pl-6">
                            {bun && <ConstructorElement key={bun._id} type="top" isLocked={true} text={bun.name + " (верх)"} price={bun.price} thumbnail={bun.image} />}
                        </div>
                        <div className={styles.column_list} ref={dropTargerRef}>
                            {middleIngredients.map((itm, index) => buildRow(itm, index))}
                        </div>

                        <div className="pl-6">
                            {bun && <ConstructorElement key={bun._id} type="bottom" isLocked={true} text={bun.name + " (низ)"} price={bun.price} thumbnail={bun.image} />}
                        </div>
                    </>
                    : <></>
            }

            <div className={styles.total}>
                <p className="text text_type_digits-medium">{orderCost}</p>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="medium" onClick={() => {
                    if (orderIngredients && orderIngredients.length != 0) {
                        const orderList = [bun._id, ...orderIngredients.map(it => it._id), bun._id];
                        doOrderFrom(dispatch, [bun._id, ...orderIngredients.map(it => it._id), bun._id])
                    }
                }}>Оформить заказ</Button>
            </div>
        </div>
    );
}

export default BurgerConstructor;