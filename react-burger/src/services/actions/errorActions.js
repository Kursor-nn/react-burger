
export function setErrorMessage(message) {
    return {
        type: "SET_ERROR_MESSAGE",
        payload: message
    }
}


export function clearErrorMessage() {
    return {
        type: "CLEAR_ERROR_MESSAGE"
    }
}