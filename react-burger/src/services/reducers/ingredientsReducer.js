import { SET_TAB, FILL_INGREDIENTS } from "../actions/ingredientsActions";
import { BUN_TAB } from "../../components/utils/constants";

const initialState = {
    ingredients: [],
    tab: BUN_TAB
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILL_INGREDIENTS: {
            return {
                ...state, ingredients: action.ingredients
            };
        }
        case SET_TAB: {
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
