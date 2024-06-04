const initialState = {
    order: [],
    show: false
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_ORDER": {
            return {
                ...state, order: action.payload
            };
        }
        case "CLEAR_ORDER": {
            return {
                ...state, order: []
            };
        }
        case "DISPLAY_ORDER": {
            return {
                ...state, show: action.state
            };
        }
        default: {
            return state;
        }
    }

}

export default orderReducer;
