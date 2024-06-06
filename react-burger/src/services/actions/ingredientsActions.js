export const FILL_INGREDIENTS = "FILL_INGREDIENTS";
export const SET_TAB = "SET_TAB";

export function fillIngredientList(ingredients) {
    return {
        type: FILL_INGREDIENTS,
        ingredients: ingredients
    }
}

export function setTab(tab) {
    return {
        type: SET_TAB,
        tab: tab
    }
}