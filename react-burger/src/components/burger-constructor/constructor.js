import React from 'react';

// KIT Components 
import { Button, ConstructorElement, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Styles
import styles from './constructor.module.css';

// Mock Data
//import data from '../../mock/mock-data.json';


function BurgerConstructor({ doOrder, ingredients }) {
    const bun = ingredients.find(item => item.type === 'bun');

    return (
        <div className={`pt-20 ${styles.column}`}>

            {
                (bun && ingredients.lenght != 0) ?
                    <>
                        <div className={styles.header_box} />
                        <div className="pl-6">
                            <ConstructorElement key={bun._id} type="top" isLocked={true} text={bun.name + " (верх)"} price={bun.price} thumbnail={bun.image} />
                        </div>
                        <div className={styles.column_list}>
                            {
                                ingredients.map((itm, index) => {
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

export default BurgerConstructor;