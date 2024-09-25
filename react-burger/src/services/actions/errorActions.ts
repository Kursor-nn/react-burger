export const SET_ERROR_MESSAGE: string = "SET_ERROR_MESSAGE";
export const CLEAR_ERROR_MESSAGE: string = "CLEAR_ERROR_MESSAGE";

export type ErrorMessageType = {
    type: string,
    errorMessage: string | null
}

export function setErrorMessage(message: string): ErrorMessageType {
    return {
        type: SET_ERROR_MESSAGE,
        errorMessage: message
    }
}