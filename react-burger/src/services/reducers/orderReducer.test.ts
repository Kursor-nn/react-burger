import {initialState, orderReducer} from "./orderReducer";
import {ADD_INGREDIENT, CLEAR_ORDER, DISPLAY_ORDER, SET_BUN, SET_ORDER_NAME, SET_ORDER_NUMBER} from "../actions/orderActions";
import {OrderActionType} from "../types";
import {expectedIngredientType} from "./ingredientsReducer.test";

const orderActionType: OrderActionType<string> = {
    type: null,
    order: [],
    state: null,
    position: null,
    orderNumber: null,
    orderName: null,
    ingredients: [],
    ingredient: null,
    bun: null,
    show: false
}

describe("orderReducer", () => {
    it("should return the initial state", () => {
        expect(orderReducer(undefined, {} as any)).toEqual(initialState);
    });


    it("check SET_ORDER_NAME", () => {
        expect(orderReducer(initialState, {
            ...orderActionType,
            type: SET_ORDER_NAME,
            orderName: "some_name"
        })).toEqual({
            ...orderActionType, orderName: "some_name"
        });
    });


    it("check SET_ORDER_NUMBER", () => {
        expect(orderReducer(initialState, {
            ...orderActionType,
            type: SET_ORDER_NUMBER,
            orderNumber: 0
        })).toEqual({
            ...orderActionType, orderNumber: 0
        });
    });


    it("check DISPLAY_ORDER", () => {
        expect(orderReducer(initialState, {
            ...orderActionType,
            type: DISPLAY_ORDER,
            state: false
        })).toEqual({
            ...orderActionType, show: false
        });
        expect(orderReducer(initialState, {
            ...orderActionType,
            type: DISPLAY_ORDER,
            state: true
        })).toEqual({
            ...orderActionType, show: true
        });
    });

    it("check SET_BUN", () => {
        expect(orderReducer(initialState, {
            ...orderActionType,
            type: SET_BUN,
            bun: expectedIngredientType
        })).toEqual({
            ...orderActionType,
            type: null,
            bun: expectedIngredientType
        });
    });


    it("check ADD_INGREDIENT", () => {
        expect(orderReducer(initialState, {
            ...orderActionType,
            type: ADD_INGREDIENT,
            ingredient: expectedIngredientType
        })).toEqual({
            ...orderActionType,
            type: null,
            order: [expectedIngredientType]
        });
    });


    it("check CLEAR_ORDER", () => {
        expect(orderReducer({
            ...initialState, order: [expectedIngredientType],
            bun: expectedIngredientType,
            orderName: "test_name",
            orderNumber: 123
        }, {
            ...orderActionType,
            type: CLEAR_ORDER,
        })).toEqual({
            ...initialState, order: [], bun: null, orderName: null, orderNumber: null
        });
    });
});
