import { fillIngredientList } from "../actions/ingredientsActions"
import { setErrorMessage } from "../actions/errorActions"

import { INGREDIENTS_URL, MAKE_ORDER_URL } from "../../components/utils/constants"
import { setOrderNumber, displayOrder, setOrderName } from "../actions/orderActions"
import { ThunkAction } from "redux-thunk"
import { Action } from "redux"
import { RootState } from "../init"

type ThunkActionType = ThunkAction<void, RootState, unknown, Action>;

export function asyncDoOrderFrom(orderIngred: any): ThunkActionType {
    return (dispatch: any) => {
        return fetch(MAKE_ORDER_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "ingredients": orderIngred })
        })
            .then((res) => (res.ok) ? res.json() : Promise.reject(`Ошибка ${res.status}`))
            .then((data) => {
                if (data.success) {
                    dispatch(setOrderName(data.name))
                    dispatch(setOrderNumber(data.order.number))
                    dispatch(displayOrder(true));
                } else {
                    dispatch(setErrorMessage("У нас лапки."))
                }
            })
            .catch((error) => {
                console.log("Error", error);
                dispatch(setErrorMessage("У нас лапки."))
            });
    }
}

export const asyncLoadIngredients = () => {
    return function (dispatch: any) {
        fetch(INGREDIENTS_URL)
            .then((res) => (res.ok) ? res.json() : Promise.reject(`Ошибка ${res.status}`))
            .then((data) => {
                dispatch(fillIngredientList(data.data));
            })
            .catch((error) => {
                console.log("Error", error);
                dispatch(setErrorMessage("У нас лапки."))
            });
    }
}