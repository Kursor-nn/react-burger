import {
    ADD_INGREDIENT,
    CLEAR_ORDER,
    DELETE_INGREDIENT_BY_POSITION,
    DISPLAY_ORDER,
    SET_BUN,
    SET_ORDER_INGREDIENTS,
    SET_ORDER_NAME,
    SET_ORDER_NUMBER
} from "../actions/orderActions";
import {OrderActionType} from "../types";

export const initialState: OrderActionType<string> = {
    type: null,
    order: [],
    state: null,
    position: null,
    orderNumber: null,
    orderName: null,
    ingredients: [],
    ingredient: null,
    bun: null,
    show: false
}

export const orderReducer = (state = initialState, action: OrderActionType<string>) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            const order = [...state.order, action.ingredient].filter(it => it != null)
            return {
                ...state, order: order
            };
        }
        case SET_BUN: {
            return {
                ...state, bun: action.bun
            };
        }
        case SET_ORDER_INGREDIENTS: {
            return {
                ...state, order: action.ingredients.filter(it => it != null)
            };
        }
        case DELETE_INGREDIENT_BY_POSITION: {
            return {
                ...state, order: [...state.order.slice(0, action.position!), ...state.order.slice(action.position! + 1, state.order.length)]
            };
        }
        case CLEAR_ORDER: {
            return {
                ...state, order: [], bun: null, orderName: null, orderNumber: null
            };
        }
        case DISPLAY_ORDER: {
            return {
                ...state, show: action.state
            };
        }
        case SET_ORDER_NUMBER: {
            return {
                ...state, orderNumber: action.orderNumber
            };
        }
        case SET_ORDER_NAME: {
            return {
                ...state, orderName: action.orderName
            };
        }
        default: {
            return state;
        }
    }

}

export default orderReducer;
