
export function updateOrder(ingredient) {
    return {
        type: "UPDATE_ORDER",
        payload: ingredient
    }
}

export function setOrderNumber(orderNumber) {
    return {
        type: "SET_ORDER_NUMBER",
        payload: orderNumber
    }
}

export function setOrderName(orderName) {
    return {
        type: "SET_ORDER_NAME",
        payload: orderName
    }
}

export function addIngredient(ingredient) {
    return {
        type: "ADD_INGREDIENT",
        payload: ingredient
    }
}

export function deleteIngredientByPosition(position) {
    return {
        type: "DELETE_INGREDIENT_BY_POSITION",
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