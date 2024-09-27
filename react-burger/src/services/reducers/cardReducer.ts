import {DELETE_CARD, SET_CARD} from "../actions/cardActions";
import {ActionType} from "../types";
import {IngredientType} from "../../components/product-list/product-list";

export type CardReducerType = {
    currentCard: IngredientType | null,
    show: boolean
}

export const initialState: CardReducerType = {
    currentCard: null,
    show: false
}

export const currentCardReducer = (state = initialState, action: ActionType<string, object>) => {
    switch (action.type) {
        case SET_CARD: {
            return {
                ...state, currentCard: action.card, show: true
            };
        }
        case DELETE_CARD: {
            return {
                ...state, currentCard: null, show: false
            };
        }
        default: {
            return state;
        }
    }
}