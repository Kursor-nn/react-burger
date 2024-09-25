import {IngredientType} from "../../components/product-list/product-list";

export const SET_CARD: string = "SET_CARD";
export const DELETE_CARD: string = "DELETE_CARD";
export const GET_DATA: string = "GET_DATA";

export function setCard(card: IngredientType) {
    return {
        type: SET_CARD,
        card: card
    }
}

export function deleteCard() {
    return {
        type: DELETE_CARD
    }
}