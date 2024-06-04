export function fillIngredientList(ingredients) {
    return {
        type: "FILL_INGREDIENTS",
        ingredients: ingredients
    }
}

export function setTab(tab) {
    return {
        type: "SET_TAB",
        tab: tab
    }
}