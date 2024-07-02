import {IngredientType} from "../../components/product-list/product-list";

export const FILL_INGREDIENTS: string = "FILL_INGREDIENTS";
export const SET_TAB: string = "SET_TAB";

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