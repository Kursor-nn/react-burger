import {FILL_INGREDIENTS, SET_TAB} from "../actions/ingredientsActions";
import {BUN_TAB} from "../../components/utils/constants";
import {IngredientActionType} from "../types";
import {IngredientType} from "../../components/product-list/product-list";

export interface IngrStateType {
    ingredients: IngredientType[],
    tab: string | null
}

const initialState = {
    ingredients: [],
    tab: BUN_TAB
}

export const ingredientsReducer = (state = initialState, action: IngredientActionType<string, IngredientType>) => {
    switch (action.type) {
        case FILL_INGREDIENTS: {
            return {
                ...state, ingredients: action.ingredients
            };
        }
        case SET_TAB: {
            const newTab = (state.tab === action.tab) ? null : action.tab
            return {
                ...state, tab: newTab
            };
        }
        default: {
            return state;
        }
    }

};