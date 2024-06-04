const initialState = {
    ingredients: [],
    tab: "bun"
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FILL_INGREDIENTS": {
            return {
                ...state, ingredients: action.ingredients
            };
        }
        case "SET_TAB": {
            const newTab = (state.ingredients.tab === action.tab) ? null : action.tab
            return {
                ...state, tab: newTab
            };
        }
        default: {
            return state;
        }
    }

}

export default ingredientsReducer;
