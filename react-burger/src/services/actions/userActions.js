export const SET_USER_DETAILS = "SET_USER_DETAILS";

export function setUser(user) {
    return {
        type: SET_USER_DETAILS,
        payload: user
    }
}