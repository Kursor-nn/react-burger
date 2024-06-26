import {
    SET_ORDER_INGREDIENTS,
    UPDATE_ORDER,
    SET_ORDER_NUMBER,
    SET_ORDER_NAME,
    ADD_INGREDIENT,
    DELETE_INGREDIENT_BY_POSITION,
    SET_BUN,
    DISPLAY_ORDER,
    CLEAR_ORDER
} from "../actions/orderActions";

const initialState = {
    order: [],
    bun: null,
    show: false,
    orderNumber: null,
    orderName: null
}

export const orderReducer = (state = initialState, action) => {
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
        };
        case SET_BUN: {
            return {
                ...state, bun: action.payload
            };
        };

        case SET_ORDER_INGREDIENTS: {
            return {
                ...state, order: action.payload.filter(it => it != null)
            };
        };

        case DELETE_INGREDIENT_BY_POSITION: {
            return {
                ...state, order: [...state.order.slice(0, action.payload), ...state.order.slice(action.payload + 1, state.order.length)]
            };
        };
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
