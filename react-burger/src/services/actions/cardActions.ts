import {IngredientType} from "../../components/product-list/product-list";

export const SET_CARD = "SET_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const GET_DATA = "GET_DATA";

export function setCard(card: IngredientType) {
    return {
        type: SET_CARD,
        payload: card
    }
}

export function deleteCard() {
    return {
        type: DELETE_CARD
    }
}