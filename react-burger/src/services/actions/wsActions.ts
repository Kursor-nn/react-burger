import {orderItemActionTypes, wsActionTypes} from "../wsTypes";
import {getAccessToken} from "../../components/utils/cookies";
import {IngredientType} from "../../components/product-list/product-list";


export function getAllOrders() {
    return {type: wsActionTypes.CONNECTION_START, payload: "/all"};
}

export function getUserOrders() {
    return {
        type: wsActionTypes.CONNECTION_START,
        payload: `?token=${getAccessToken()?.replace("Bearer ", "")}`,
    };
}

export function getOrderItem(selectedOrder: IngredientType[]) {
    return {
        type: orderItemActionTypes.GET_ORDER_ITEM,
        payload: selectedOrder,
    };
}

export function closeTheConnection() {
    return {type: wsActionTypes.CLOSE};
}
