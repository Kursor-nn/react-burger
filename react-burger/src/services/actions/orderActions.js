
export function updateOrder(ingredient) {
    return {
        type: "UPDATE_ORDER",
        payload: ingredient
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