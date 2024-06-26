import { SET_USER_DETAILS } from "../actions/userActions";

const initState = {
    user: null
}

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DETAILS: {
            return { ...state, user: action.payload };
        }
        default: {
            return state;
        }
    }
}

export default userReducer;
