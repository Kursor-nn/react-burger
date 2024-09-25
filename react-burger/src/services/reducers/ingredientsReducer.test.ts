import {ingredientsReducer, initialState} from "./ingredientsReducer";
import {FILL_INGREDIENTS, SET_TAB} from "../actions/ingredientsActions";
import {IngredientType} from "../../components/product-list/product-list";

export const expectedIngredientType: IngredientType = {
    _id: "1",
    count: 2,
    index: 3,
    uniqueId: "4",
    image: "5",
    name: "6",
    price: 7,
    type: "8",
    calories: 9,
    proteins: 10,
    fat: 11,
    carbohydrates: 12,
    image_large: "13"
}

describe("errorReducer", () => {
    it("should return the initial state", () => {
        expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState);
    });

    it("check SET_TAB", () => {
        expect(ingredientsReducer(initialState, {
            type: SET_TAB,
            ingredients: [],
            tab: "temp",
        })).toEqual({
            ingredients: [],
            tab: "temp"
        });
    });


    it("check FILL_INGREDIENTS", () => {
        expect(ingredientsReducer(initialState, {
            type: FILL_INGREDIENTS,
            ingredients: [expectedIngredientType],
            tab: "temp",
        })).toEqual({
            ingredients: [expectedIngredientType],
            tab: "bun"
        });
    });
});
