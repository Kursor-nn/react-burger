
export function setCard(card) {
    console.log(card);
    return {
        type: "SET_CARD",
        payload: card
    }
}

export function deleteCard(card) {
    return {
        type: "DELETE_CARD"
    }
}

export function getData(){
    return {
        type: "GET_DATA"
    }
}
