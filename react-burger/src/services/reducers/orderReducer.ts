import {
    ADD_INGREDIENT,
    CLEAR_ORDER,
    DELETE_INGREDIENT_BY_POSITION,
    DISPLAY_ORDER,
    SET_BUN,
    SET_ORDER_INGREDIENTS,
    SET_ORDER_NAME,
    SET_ORDER_NUMBER,
    UPDATE_ORDER
} from "../actions/orderActions";
import {OrderActionType} from "../types";

const initialState = {
    order: [],
    bun: null,
    show: false,
    orderNumber: null,
    orderName: null
}

export const orderReducer = (state = initialState, action: OrderActionType<string, object>) => {
    switch (action.type) {
        case UPDATE_ORDER: {
            return {
                ...state, order: action.payload.filter(it => it != null)
            };
        }
        case ADD_INGREDIENT: {
            const order = [...state.order, action.payload].filter(it => it != null)
            return {
                ...state, order: order
            };
        }
        case SET_BUN: {
            return {
                ...state, bun: action.payload
            };
        }
        case SET_ORDER_INGREDIENTS: {
            return {
                ...state, order: action.payload.filter(it => it != null)
            };
        }
        case DELETE_INGREDIENT_BY_POSITION: {
            return {
                ...state, order: [...state.order.slice(0, action.position), ...state.order.slice(action.position + 1, state.order.length)]
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
                ...state, orderNumber: action.payload
            };
        }
        case SET_ORDER_NAME: {
            return {
                ...state, orderName: action.payload
            };
        }
        default: {
            return state;
        }
    }

}

export default orderReducer;
