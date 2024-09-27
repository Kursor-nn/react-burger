import {CLEAR_ERROR_MESSAGE, SET_ERROR_MESSAGE} from "../actions/errorActions";
import {ActionType} from "../types";

export interface ErrorStateType {
    message: string | null,
    show: boolean
}

export const initialState: ErrorStateType = {
    message: null,
    show: false
}

export const errorReducer = (state = initialState, action: ActionType<string, ErrorStateType>) => {
    switch (action.type) {
        case SET_ERROR_MESSAGE: {
            console.log("action> ", action)
            return {
                ...state, message: (action.payload.message || "something happens"), show: true
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

};