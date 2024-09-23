import { SET_ERROR_MESSAGE, CLEAR_ERROR_MESSAGE } from "../actions/errorActions";
import {ActionType} from "../types";

const initialState = {
    message: null,
    show: false
}

export const errorReducer = (state = initialState, action: ActionType<string, object>) => {
    switch (action.type) {
        case SET_ERROR_MESSAGE: {
            return {
                ...state, message: action.payload, show: true
            };
        }
        case CLEAR_ERROR_MESSAGE: {
            return {
                ...state, message: null, show: false
            };
        }
        default: {
            return state;
        }
    }

}

export default errorReducer;
