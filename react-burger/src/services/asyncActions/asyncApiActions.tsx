import { fillIngredientList } from "../actions/ingredientsActions"
import { setErrorMessage } from "../actions/errorActions"

import { INGREDIENTS_URL, LOGIN_PATH, MAKE_ORDER_URL } from "../../components/utils/constants"
import { setOrderNumber, displayOrder, setOrderName } from "../actions/orderActions"
import { ThunkAction } from "redux-thunk"
import { Action } from "redux"
import { RootState } from "../init"

import { DEFAULT_HEADERS } from "../../components/utils/constants"
import { useNavigate } from "react-router"
import { getAccessToken } from "../../components/utils/cookies"

type ThunkActionType = ThunkAction<void, RootState, unknown, Action>;

const errorHandler = (dispatch: any, error: any = null) => {
    if (error) {
        console.log("Error", error);
    }
    dispatch(setErrorMessage("У нас лапки."))
}

const checkResponseIsSuccess = (res: any) => {
    return (res.ok) ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}

export function asyncDoOrderFrom(orderIngred: any, accessCallback: any): ThunkActionType {
    if (!getAccessToken() || getAccessToken() === "") {
        accessCallback()
    }

    return (dispatch: any) => {
        return fetch(MAKE_ORDER_URL, {
            method: 'POST',
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({ "ingredients": orderIngred })
        })
            .then(checkResponseIsSuccess)
            .then((data) => {
                if (data.success) {
                    dispatch(setOrderName(data.name))
                    dispatch(setOrderNumber(data.order.number))
                    dispatch(displayOrder(true));
                } else {
                    errorHandler(dispatch)
                }
            })
            .catch((error) => {
                errorHandler(dispatch, error)
            });
    }
}

export const asyncLoadIngredients = () => {
    return function (dispatch: any) {
        fetch(INGREDIENTS_URL)
            .then(checkResponseIsSuccess)
            .then((data) => {
                dispatch(fillIngredientList(data.data));
            })
            .catch((error) => {
                errorHandler(dispatch, error)
            });
    }
}