// Redux
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

//Styles
import styles from './ingredient-details.module.css'

import { asyncLoadIngredients } from '../../services/asyncActions/asyncApiActions';
import { useEffect, useState } from 'react';
import { setCard } from '../../services/actions/cardActions';

import cn from "classnames"

function IngredientDetails() {
    const params = useParams()
    const dispatch = useDispatch();

    var card = useSelector((state) => state.card.currentCard);
    const ingredients = useSelector((state) => state.ingredients.ingredients);

    const info = [
        { title: "Калории,ккал", value: card?.calories },
        { title: "Белки, г", value: card?.proteins },
        { title: "Жиры, г", value: card?.fat },
        { title: "Углеводы, г", value: card?.carbohydrates },
    ];

    useEffect(() => {
        if (!ingredients || ingredients.length === 0) {
            dispatch(asyncLoadIngredients());
        }
        if (!card) {
            const actualIngr = ingredients.find((item) => item._id === params.id);
            if (actualIngr) {
                dispatch(setCard({
                    name: actualIngr.name,
                    calories: actualIngr.calories,
                    proteins: actualIngr.proteins,
                    fat: actualIngr.fat,
                    carbohydrates: actualIngr.carbohydrates,
                    image_large: actualIngr.image_large,
                }));
            }
        }
    }, [ingredients]);

    function buildValue(item, index) {
        return (
            <li className={styles.item} key={index}>
                <p className="text text_type_main-default text_color_inactive">{item.title}</p>
                <span className="text text_type_digits-default text_color_inactive">
                    {item.value}
                </span>
            </li>
        );
    }

    return (
        <div className={styles.wrapper}>
            <img
                src={card?.image_large}
                alt={card?.name}
                className={`ml-5 mr-5 ${styles.image}`}
            />
            <p className={`text text_type_main-medium mt-4`}>{card?.name}</p>
            <ul className={styles.list}>
                {info.map((item, index) => buildValue(item, index))}
            </ul>
        </div>
    )
}

export default IngredientDetails;