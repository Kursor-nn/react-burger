import {IngredientType} from "../../components/product-list/product-list";

export const FILL_INGREDIENTS = "FILL_INGREDIENTS";
export const SET_TAB = "SET_TAB";

export function fillIngredientList(ingredients: IngredientType[]) {
    return {
        type: FILL_INGREDIENTS,
        ingredients: ingredients
    }
}

export function setTab(tab: string) {
    return {
        type: SET_TAB,
        tab: tab
    }
}