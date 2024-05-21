import React from 'react';

// KIT Components 
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Styles
import styles from './constructor.module.css';

// Mock Data
import data from '../../mock/mock-data.json';


class BurgerConstructor extends React.Component {
    render() {
        const bun = data.find(item => item.type === 'bun');

        return (
            <div className={`pt-20 ${styles.column}`}>
                <div className={styles.header_box} />

                <ConstructorElement key={bun._id} type="top" isLocked={true} text={bun.name + " (верх)"} price={bun.price} thumbnail={bun.image} />

                <div className={styles.column_list}>
                    {
                        data.map((itm) => {
                            return <ConstructorElement key={itm._id} text={itm.name} price={itm.price} thumbnail={itm.image} />
                        })}
                </div>

                <ConstructorElement key={bun._id} type="bottom" isLocked={true} text={bun.name + " (низ)"} price={bun.price} thumbnail={bun.image} />

                <div className={styles.total}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                    <Button type="primary" size="medium">Оформить заказ</Button>
                </div>
            </div>
        );
    }
}

export default BurgerConstructor;