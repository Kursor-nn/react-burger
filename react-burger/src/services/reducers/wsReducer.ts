import {TWSActions, wsActionTypes, WsDataType} from "../types";

interface WsStateType {
    wsConnected: boolean;
    data: WsDataType[];
    error?: Event;
}

const initialState: WsStateType = {
    wsConnected: false,
    data: [],
};

export const wsReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {
        case wsActionTypes.CONNECTION_START: {
            return {
                ...state,
                error: undefined,
            };
        }
        case wsActionTypes.CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true,
            };

        case wsActionTypes.CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false,
            };

        case wsActionTypes.CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                data: [],
            };

        case wsActionTypes.GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                data: [action.payload],
            };
        default:
            return state;
    }
};
