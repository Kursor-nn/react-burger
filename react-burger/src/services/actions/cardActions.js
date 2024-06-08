export const SET_CARD = "SET_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const GET_DATA = "GET_DATA";

export function setCard(card) {
    return {
        type: SET_CARD,
        payload: card
    }
}

export function deleteCard(card) {
    return {
        type: DELETE_CARD
    }
}

export function getData() {
    return {
        type: GET_DATA
    }
}
