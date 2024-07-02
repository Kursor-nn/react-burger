import {IngredientType} from "../../components/product-list/product-list";
import { v4 as uuid4 } from "uuid"

export const SET_ORDER_INGREDIENTS = "SET_ORDER_INGREDIENTS";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const SET_ORDER_NUMBER = "SET_ORDER_NUMBER";
export const SET_ORDER_NAME = "SET_ORDER_NAME";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT_BY_POSITION = "DELETE_INGREDIENT_BY_POSITION";
export const SET_BUN = "SET_BUN";
export const DISPLAY_ORDER = "DISPLAY_ORDER";
export const CLEAR_ORDER = "CLEAR_ORDER";

export function setOrder(ingredients: IngredientType[]) {
    return {
        type: SET_ORDER_INGREDIENTS,
        payload: ingredients
    }
}

export function setOrderNumber(orderNumber: number) {
    return {
        type: SET_ORDER_NUMBER,
        payload: orderNumber
    }
}

export function setOrderName(orderName: string) {
    return {
        type: SET_ORDER_NAME,
        payload: orderName
    }
}

export function addIngredient(ingredient: IngredientType) {

    return {
        type: ADD_INGREDIENT,
        payload: {
            ...ingredient,
            uniqueId: uuid4()
        }
    }
}

export function deleteIngredientByPosition(position: number) {
    return {
        type: DELETE_INGREDIENT_BY_POSITION,
        payload: position
    }
}

export function setBun(bun: IngredientType) {
    return {
        type: SET_BUN,
        payload: bun
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