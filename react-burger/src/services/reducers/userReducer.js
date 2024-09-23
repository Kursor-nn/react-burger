import {SET_USER_DETAILS, UserType} from "../actions/userActions";

const initState = {
    user: UserType
}

export const userReducer = (state = initState, action) => {
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
