import {initialState, wsReducer} from "./wsReducer";
import {wsActionTypes} from "../types";

describe("wsReducer", () => {
    it("should return the initial state", () => {
        expect(wsReducer(undefined, {} as any)).toEqual(initialState);
    });


    it("check CONNECTION_START", () => {
        expect(wsReducer({
            ...initialState, error: null
        }, {
            type: wsActionTypes.CONNECTION_START,
            payload: "test"
        })).toEqual({
            ...initialState
        });
    });

    it("check CONNECTION_SUCCESS", () => {
        expect(wsReducer({
            ...initialState, error: null, wsConnected: false
        }, {
            type: wsActionTypes.CONNECTION_SUCCESS,
        })).toEqual({
            ...initialState, wsConnected: true
        });
    });

    it("check CONNECTION_ERROR", () => {
        expect(wsReducer({
            ...initialState, error: null, wsConnected: true
        }, {
            type: wsActionTypes.CONNECTION_ERROR,
            payload: null
        })).toEqual({
            ...initialState, error: null, wsConnected: false
        });
    });

    it("check CONNECTION_CLOSED", () => {
        expect(wsReducer({
            ...initialState, error: null, wsConnected: true
        }, {
            type: wsActionTypes.CONNECTION_CLOSED
        })).toEqual({
            ...initialState, error: undefined, wsConnected: false
        });
    });

    it("check GET_MESSAGE", () => {
        expect(wsReducer({
            ...initialState, error: null, wsConnected: true
        }, {
            type: wsActionTypes.GET_MESSAGE,
            payload: {
                success: true,
                orders: [],
                total: 0,
                totalToday: 1
            }
        })).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: true,
            data: [
                {
                    success: true,
                    orders: [],
                    total: 0,
                    totalToday: 1
                }
            ]
        });
    });

});
