const initialState = {
    currentCard: null,
    show: false
}

export const currentCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CARD": {
            return {
                ...state, currentCard: action.payload, show: true
            };
        }
        case "DELETE_CARD": {
            return {
                ...state, currentCard: null, show: false
            };
        }
        default: {
            return state;
        }
    }

}

export default currentCardReducer;
