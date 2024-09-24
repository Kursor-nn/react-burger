import {SET_USER_DETAILS, UserType} from "../actions/userActions";
import {ActionType} from "../types";

const initState = {
    user: null
}

export const userReducer = (state = initState, action: ActionType<string, UserType>) => {
    switch (action.type) {
        case SET_USER_DETAILS: {
            return {...state, user: action.payload};
        }
        default: {
            return state;
        }
    }
}

export default userReducer;
