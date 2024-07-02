export const SET_USER_DETAILS: string = "SET_USER_DETAILS";

export interface UserType{
    name: string,
    email: string
}

export function setUser(user: UserType | null) {
    return {
        type: SET_USER_DETAILS,
        payload: user
    }
}