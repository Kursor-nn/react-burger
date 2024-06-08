export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const CLEAR_ERROR_MESSAGE = "CLEAR_ERROR_MESSAGE";

export function setErrorMessage(message) {
    return {
        type: SET_ERROR_MESSAGE,
        payload: message
    }
}


export function clearErrorMessage() {
    return {
        type: CLEAR_ERROR_MESSAGE
    }
}