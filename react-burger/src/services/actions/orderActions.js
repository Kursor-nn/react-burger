export const SET_ORDER_INGREDIENTS = "SET_ORDER_INGREDIENTS";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const SET_ORDER_NUMBER = "SET_ORDER_NUMBER";
export const SET_ORDER_NAME = "SET_ORDER_NAME";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT_BY_POSITION = "DELETE_INGREDIENT_BY_POSITION";
export const SET_BUN = "SET_BUN";
export const DISPLAY_ORDER = "DISPLAY_ORDER";
export const CLEAR_ORDER = "CLEAR_ORDER";

export function setOrder(ingredients) {
    return {
        type: SET_ORDER_INGREDIENTS,
        payload: ingredients
    }
}

export function updateOrder(ingredient) {
    return {
        type: UPDATE_ORDER,
        payload: ingredient
    }
}

export function setOrderNumber(orderNumber) {
    return {
        type: SET_ORDER_NUMBER,
        payload: orderNumber
    }
}

export function setOrderName(orderName) {
    return {
        type: SET_ORDER_NAME,
        payload: orderName
    }
}

export function addIngredient(ingredient) {
    return {
        type: ADD_INGREDIENT,
        payload: ingredient
    }
}

export function deleteIngredientByPosition(position) {
    return {
        type: DELETE_INGREDIENT_BY_POSITION,
        payload: position
    }
}

export function setBun(bun) {
    return {
        type: "SET_BUN",
        payload: bun
    }
}

export function displayOrder(state) {
    return {
        type: "DISPLAY_ORDER",
        state: state
    }
}

export function clearOrder() {
    return {
        type: "CLEAR_ORDER"
    }
}