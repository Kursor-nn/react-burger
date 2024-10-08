// Redux
import { useParams } from "react-router-dom";

//Styles
import styles from './ingredient-details.module.css'

import { asyncLoadIngredients } from '../../services/asyncActions/asyncApiActions';
import { useEffect } from 'react';
import { setCard } from '../../services/actions/cardActions';

import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import { IngredientType } from '../product-list/product-list';

export interface IngredientDetailsType {
    title: string,
    value: number
}

function IngredientDetails() {
    const params = useParams()
    const dispatch = useAppDispatch();

    var card = useTypedSelector((state) => state.card.currentCard);
    const ingredients: IngredientType[] = useTypedSelector((state) => state.ingredients.ingredients);

    const info: IngredientDetailsType[] = [
        { title: "Калории,ккал", value: card?.calories ? card?.calories : 0 },
        { title: "Белки, г", value: card?.proteins ? card?.proteins : 0 },
        { title: "Жиры, г", value: card?.fat ? card?.fat : 0 },
        { title: "Углеводы, г", value: card?.carbohydrates ? card?.carbohydrates : 0 },
    ];

    useEffect(() => {
        if (!ingredients || ingredients.length === 0) {
            dispatch(asyncLoadIngredients());
        }
        if (!card) {
            const actualIngr = ingredients.find((item) => item._id === params.id);
            if (actualIngr) {
                dispatch(setCard({
                    image: null,
                    count: 0,
                    type: null,
                    price: null,
                    uniqueId: null,
                    _id: null,
                    index: null,
                    name: actualIngr.name,
                    calories: actualIngr.calories,
                    proteins: actualIngr.proteins,
                    fat: actualIngr.fat,
                    carbohydrates: actualIngr.carbohydrates,
                    image_large: actualIngr.image_large,
                } ));
            }
        }
    }, [ingredients, card, dispatch, params.id]);

    function buildValue(title: string, value: number, index: number) {
        return (
            <li className={styles.item} key={index}>
                <p className="text text_type_main-default text_color_inactive">{title}</p>
                <span className="text text_type_digits-default text_color_inactive">
                    {value}
                </span>
            </li>
        );
    }

    return (
        <div className={styles.wrapper}>
            <img
                src={card?.image_large}
                alt={card?.name ? card?.name : ""}
                className={`ml-5 mr-5 ${styles.image}`}
            />
            <p className={`text text_type_main-medium mt-4`}>{card?.name ? card?.name : ""}</p>
            <ul className={styles.list}>
                {info.map((item, index) => buildValue(item.title, item.value, index))}
            </ul>
        </div>
    )
}

export default IngredientDetails;