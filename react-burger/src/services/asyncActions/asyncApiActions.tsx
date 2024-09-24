import {fillIngredientList} from "../actions/ingredientsActions"
import {setErrorMessage} from "../actions/errorActions"

import {INGREDIENTS_URL, MAKE_ORDER_URL} from "../../components/utils/constants"
import {setOrderNumber, displayOrder, setOrderName} from "../actions/orderActions"
import {ThunkAction, ThunkDispatch} from "redux-thunk"
import {UnknownAction} from "redux"
import {RootState} from "../init"

import {getAccessToken} from "../../components/utils/cookies"

export type ThunkActionType = ThunkAction<void, RootState, unknown, UnknownAction>;

const errorHandler = (dispatch: any, error: any = null) => {
    if (error) {
        console.log("Error", error);
    }
    dispatch(setErrorMessage("У нас лапки."))
}

const checkResponseIsSuccess = (res: Response) => {
    return (res.ok) ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}

export function asyncDoOrderFrom(orderIngred: any, accessCallback: any): ThunkActionType {
    if (!getAccessToken() || getAccessToken() === "") {
        accessCallback()
    }

    return (dispatch: ThunkDispatch<any, any, any>) => {
        return fetch(MAKE_ORDER_URL, {
            method: 'POST',
            // @ts-ignore
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=utf-8",
                Authorization: (getAccessToken() ? getAccessToken() : ""),
            },
            body: JSON.stringify({"ingredients": orderIngred})
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

export const asyncLoadIngredients = (): ThunkActionType => {
    return function (dispatch: ThunkDispatch<any, any, any>) {
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