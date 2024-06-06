// KIT Components 
import { Button, ConstructorElement, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Styles
import styles from './constructor.module.css';

// Mock Data
//import data from '../../mock/mock-data.json';

import { asyncDoOrderFrom, asyncGetIngredients } from '../../services/asyncActions/asyncApiActions';

// React
import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setOrder, addIngredient, setBun } from '../../services/actions/orderActions';
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
            const newIngr = { ...ingredients.find(it => it._id == item.id) }
            if (newIngr.type == 'bun') {
                dispatch(setBun(newIngr))
            } else {
                newIngr.index = orderIngredients.length
                dispatch(addIngredient(newIngr))
            }
        },
    });

    const orderCost = orderIngredients.map(it => it.price).reduce((a, b) => a + b, 0) + (bun == null ? 0 : 2 * bun.price)

    function buildRow(value, index, moveCard) {
        return (
            <ConstructorItem key={value.uniqueId} value={value} index={index} moveCard={moveCard} />
        )
    }

    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = orderIngredients[dragIndex];
            const order = [...orderIngredients];
            order.splice(dragIndex, 1);
            order.splice(hoverIndex, 0, dragCard);

            dispatch(setOrder(order));
        },
        [orderIngredients, dispatch]
    );

    return (
        <div className={`pt-20 ${styles.column}`}>
            {
                (middleIngredients.lenght != 0) ?
                    <>
                        <div className={styles.header_box} />
                        <div className="pl-6">
                            {bun && <ConstructorElement key={bun.uniqueId} type="top" isLocked={true} text={bun.name + " (верх)"} price={bun.price} thumbnail={bun.image} />}
                        </div>
                        <div className={styles.column_list} ref={dropTargerRef}>
                            {middleIngredients.map((itm, index) => buildRow(itm, index, moveCard))}
                        </div>

                        <div className="pl-6">
                            {bun && <ConstructorElement key={bun.uniqueId} type="bottom" isLocked={true} text={bun.name + " (низ)"} price={bun.price} thumbnail={bun.image} />}
                        </div>
                    </>
                    : <></>
            }

            <div className={styles.total}>
                <p className="text text_type_digits-medium">{orderCost}</p>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="medium" onClick={() => {
                    if (bun && orderIngredients && orderIngredients.length != 0) {
                        const orderList = [bun._id, ...orderIngredients.map(it => it._id), bun._id];
                        dispatch(asyncDoOrderFrom(orderList))
                    }
                }}>Оформить заказ</Button>
            </div>
        </div>
    );
}

export default BurgerConstructor;