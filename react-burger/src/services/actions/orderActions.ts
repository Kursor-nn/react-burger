import {IngredientType} from "../../components/product-list/product-list";
import {v4 as uuid4} from "uuid"

export const SET_ORDER_INGREDIENTS: string = "SET_ORDER_INGREDIENTS";
export const SET_ORDER_NUMBER: string = "SET_ORDER_NUMBER";
export const SET_ORDER_NAME: string = "SET_ORDER_NAME";
export const ADD_INGREDIENT: string = "ADD_INGREDIENT";
export const DELETE_INGREDIENT_BY_POSITION: string = "DELETE_INGREDIENT_BY_POSITION";
export const SET_BUN: string = "SET_BUN";
export const DISPLAY_ORDER: string = "DISPLAY_ORDER";
export const CLEAR_ORDER: string = "CLEAR_ORDER";

export function setOrder(ingredients: (IngredientType | null)[]) {
    return {
        type: SET_ORDER_INGREDIENTS,
        ingredients: ingredients
    }
}

export function setOrderNumber(orderNumber: number) {
    return {
        type: SET_ORDER_NUMBER,
        orderNumber: orderNumber
    }
}

export function setOrderName(orderName: string) {
    return {
        type: SET_ORDER_NAME,
        orderName: orderName
    }
}

export function addIngredient(ingredient: IngredientType) {

    return {
        type: ADD_INGREDIENT,
        ingredient: {
            ...ingredient,
            uniqueId: uuid4()
        }
    }
}

export function deleteIngredientByPosition(position: number) {
    return {
        type: DELETE_INGREDIENT_BY_POSITION,
        position: position
    }
}

export function setBun(bun: IngredientType) {
    return {
        type: SET_BUN,
        bun: bun
    }
}

export function displayOrder(state: boolean) {
    return {
        type: DISPLAY_ORDER,
        state: state
    }
}

export function clearOrder() {
    return {
        type: CLEAR_ORDER
    }
}