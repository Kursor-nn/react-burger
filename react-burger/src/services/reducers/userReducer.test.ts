import {initState, userReducer} from "./userReducer";
import {SET_USER_DETAILS, UserType} from "../actions/userActions";

const expecteduser: UserType = {
    "name": "name",
    "email": "email",
    "password": "password",
}

describe("userReducer", () => {
    it("should return the initial state", () => {
        expect(userReducer(undefined, {} as any)).toEqual(initState);
    });

    it("check SET_USER_DETAILS", () => {
        expect(userReducer(initState, {
            type: SET_USER_DETAILS,
            payload: expecteduser,
            card: null
        })).toEqual({
            ...initState, user: expecteduser
        });
    });

});
