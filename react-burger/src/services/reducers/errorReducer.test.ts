import {errorReducer, initialState} from "./errorReducer";
import {CLEAR_ERROR_MESSAGE, SET_ERROR_MESSAGE} from "../actions/errorActions";

describe("errorReducer", () => {
    it("should return the initial state", () => {
        expect(errorReducer(undefined, {} as any)).toEqual(initialState);
    });

    it("check SET_ERROR_MESSAGE", () => {
        expect(
            errorReducer(initialState, {
                type: SET_ERROR_MESSAGE,
                payload: {
                    message: "some message",
                    show: false
                },
                card: null
            })
        ).toEqual({
            ...initialState,
            message: "some message",
            show: true
        });
    });

    it("check SET_ERROR_MESSAGE", () => {
        expect(
            errorReducer({
                message: "some_message",
                show: true
            }, {
                type: CLEAR_ERROR_MESSAGE,
                payload: {
                    message: "some message",
                    show: false
                },
                card: null
            })
        ).toEqual({
            ...initialState,
            message: null,
            show: false
        });
    });
});
