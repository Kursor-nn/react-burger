// KIT Components 
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Styles
import styles from './constructor.module.css';

// Mock Data
//import data from '../../mock/mock-data.json';

import { asyncDoOrderFrom } from '../../services/asyncActions/asyncApiActions';

// React
import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import { INGREDIENT_DND_TYPE, LOGIN_PATH } from '../utils/constants';

import { setOrder, addIngredient, setBun } from '../../services/actions/orderActions';
import ConstructorItem from './item';
import { useNavigate } from 'react-router';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import { IngredientType } from '../product-list/product-list';

const BurgerConstructor = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const ingredients = useTypedSelector((store) => store.ingredients.ingredients);
    const orderIngredients = useTypedSelector((store) => store.order.order);
    const bun = useTypedSelector((store) => store.order.bun);
    const middleIngredients = orderIngredients.filter(item => item.type !== 'bun')

    const [x, dropTargerRef] = useDrop({
        accept: INGREDIENT_DND_TYPE,
        collect: (monitor) => ({}),
        drop(item: any) {
            const newIngr = ingredients.find(it => it._id === item.id)
            if (newIngr?.type == 'bun') {
                dispatch(setBun(newIngr))
            } else {
                newIngr!.index = orderIngredients.length
                dispatch(addIngredient(newIngr!))
            }
        },
    });

    const orderCost = orderIngredients
        .filter(it => it.price != null)
        .map(it => it.price!!)
        .reduce((a, b) => a + b, 0) + (bun == null ? 0 : 2 * bun.price!!)


    function buildRow(value: IngredientType, index: number, moveCard: (dragIndex: number, hoverIndex: number) => void) {
        return (
            <ConstructorItem key={value.uniqueId} value={value} index={index} moveCard={moveCard} />
        )
    }

    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
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
                (middleIngredients) ?
                    <>
                        <div className={styles.header_box} />
                        <div className="pl-6">
                            {bun && <ConstructorElement key={bun.uniqueId} type="top" isLocked={true} text={bun.name + " (верх)"} price={bun.price!!} thumbnail={bun.image!!} />}
                        </div>
                        <div className={styles.column_list} ref={dropTargerRef}>
                            {middleIngredients.map((itm, index) => buildRow(itm, index, moveCard))}
                        </div>

                        <div className="pl-6">
                            {bun && <ConstructorElement key={bun.uniqueId} type="bottom" isLocked={true} text={bun.name + " (низ)"} price={bun.price!!} thumbnail={bun.image!!} />}
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
                        dispatch(asyncDoOrderFrom(orderList, () => {
                            navigate(LOGIN_PATH)
                        }))
                    }
                }}>Оформить заказ</Button>
            </div>
        </div>
    );
}

export default BurgerConstructor;