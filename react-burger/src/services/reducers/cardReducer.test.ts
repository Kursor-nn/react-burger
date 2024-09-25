import {currentCardReducer, initialState} from "./cardReducer";
import {DELETE_CARD, SET_CARD} from "../actions/cardActions";
import {IngredientType} from "../../components/product-list/product-list";

export const expectedCard: IngredientType = {
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

describe("currentCardReducer", () => {
    it("should return the initial state", () => {
        expect(currentCardReducer(undefined, {} as any)).toEqual(initialState);
    });

    it("should handle SET_CARD", () => {
        expect(
            currentCardReducer(initialState, {
                type: SET_CARD,
                payload: {},
                card: null
            })
        ).toEqual({
            ...initialState,
            currentCard: null,
            show: true
        });

        expect(
            currentCardReducer(initialState, {
                type: SET_CARD,
                payload: {},
                card: expectedCard
            })
        ).toEqual({
            ...initialState,
            currentCard: expectedCard,
            show: true
        });
    });

    it("should handle DELETE_CARD", () => {

        expect(
            currentCardReducer({
                ...initialState,
                currentCard: expectedCard,
                show: true
            }, {
                type: DELETE_CARD,
                payload: {},
                card: expectedCard
            })
        ).toEqual({
            ...initialState,
            currentCard: null,
            show: false
        });
    });

});
