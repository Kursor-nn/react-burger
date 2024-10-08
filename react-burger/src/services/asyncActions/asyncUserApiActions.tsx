import {setErrorMessage} from "../actions/errorActions"

import {ThunkAction} from "redux-thunk"
import {Action} from "redux"
import {AppDispatch, RootState} from "../init"
import {BASE_URL, DEFAULT_HEADERS} from "../../components/utils/constants"
import {setUser, UserType} from "../actions/userActions";
import {ACCESS_TOKEN_COOKIE, getAccessToken, REFRESH_TOKEN_COOKIE, setCookie} from "../../components/utils/cookies"

import {ErrorNotification, InfoNotification} from "../../components/notifications/notification"

export const ENDPOINT_FOR_LOGIN: string = "auth/login";
export const ENDPOINT_FOR_REGISTER: string = "auth/register";
export const ENDPOINT_FOR_USER: string = "auth/user";
export const ENDPOINT_FOR_LOGOUT: string = "auth/logout";
export const ENDPOINT_FOR_REFRESH_TOKEN: string = "auth/token";
export const ENDPOINT_FOR_FORGOT_PASSWORD: string = "password-reset";
export const ENDPOINT_FOR_RESET_PASSWORD: string = "password-reset/reset";

type ThunkActionType = ThunkAction<void, RootState, unknown, Action>;

export interface ErrorResponseType {
    message: string | null | number
}

const errorHandler = (dispatch: AppDispatch, error = null) => {
    if (error) {
        console.log("Error", error);
    }
    dispatch(setErrorMessage("У нас лапки."))
    ErrorNotification("У нас лапки.");
}

const checkResponseIsSuccess = (res: Response) => {
    return (res.ok) ? res.json() : Promise.reject(res.json())
}

export const saveTokens = (refreshToken: string, accessToken: string) => {
    setCookie(ACCESS_TOKEN_COOKIE, accessToken);
    localStorage.setItem(REFRESH_TOKEN_COOKIE, refreshToken);
};


export const asyncLoadUser = () => {
    return function (dispatch: AppDispatch) {
        const accessTokenIsExists = (getAccessToken() && getAccessToken() !== "")
        if (!accessTokenIsExists) return;


        const headers: Headers = accessTokenIsExists ? new Headers({
            "Authorization": (getAccessToken() ? getAccessToken()! : ""),
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }) : new Headers(DEFAULT_HEADERS)

        return fetch(`${BASE_URL}${ENDPOINT_FOR_USER}`,
            {
                method: "GET",
                headers: headers
            })
            .then(checkResponseIsSuccess)
            .then((data) => {
                if (data.success) {
                    if (data.user) {
                        dispatch(setUser(data.user));
                    }
                    if (data.refreshToken && data.accessToken) {
                        saveTokens(data.refreshToken, data.accessToken);
                    }
                } else {
                    if (data.message === "jwt expired") {
                        dispatch(refreshToken())
                        dispatch(asyncLoadUser())
                    }
                }
            })
            .catch((error) => {
                error.then((errorResponse: ErrorResponseType) => {
                    if (errorResponse.message === "jwt expired") {
                        dispatch(refreshToken())
                        dispatch(asyncLoadUser())
                    } else {
                        ErrorNotification("У нас лапки.");
                    }
                })
            });
    }
};

export const asyncLogin = (email: string, password: string, callback: () => void) => {
    return function (dispatch: AppDispatch) {
        return fetch(`${BASE_URL}${ENDPOINT_FOR_LOGIN}`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({email: email, password: password}),
        })
            .then(checkResponseIsSuccess)
            .then((data) => {
                if (data.success) {
                    dispatch(setUser(data.user));
                    saveTokens(data.refreshToken, data.accessToken);
                    callback()
                    InfoNotification("Вы успешно авторизованы!");
                } else {
                    ErrorNotification(data.message)
                }
            })
            .catch((error: Promise<string>) => {
                error.then((data: string) => {
                    ErrorNotification(data);
                })
            });
    }
}

export const asyncLogout = (callback: () => void): ThunkActionType => {
    return function (dispatch: AppDispatch) {
        return fetch(`${BASE_URL}${ENDPOINT_FOR_LOGOUT}`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({
                token: localStorage.getItem(REFRESH_TOKEN_COOKIE),
            }),
        })
            .then(checkResponseIsSuccess)
            .then((data) => {
                dispatch(setUser(null));
                saveTokens("", "");
                callback()
                InfoNotification("ну и ладно. ни у не надо.");
            })
            .catch((error) => {
                errorHandler(dispatch, error)
            });
    }
};

export const asyncRegister = (email: string, password: string, name: string, callback: () => void) => {
    return function (dispatch: AppDispatch) {
        return fetch(`${BASE_URL}${ENDPOINT_FOR_REGISTER}`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({email: email, password: password, name: name}),
        })
            .then(checkResponseIsSuccess)
            .then((data) => {
                dispatch(setUser(data.user));
                saveTokens(data.refreshToken, data.accessToken);
                callback()
            })
            .catch((error) => {
                error.then((errorData: string) => {
                    ErrorNotification(errorData);
                })
            });
    }
}

export const imForgotPassword = (email: string, callback: () => void) => {
    return function (dispatch: AppDispatch) {
        return fetch(`${BASE_URL}${ENDPOINT_FOR_FORGOT_PASSWORD}`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({email: email}),
        })
            .then(checkResponseIsSuccess)
            .then((data) => callback())
            .catch((error) => {
                errorHandler(dispatch, error)
            });
    }
}

export const resetPassword = (password: string, token: string, callback: () => void) => {
    return function (dispatch: AppDispatch) {
        return fetch(`${BASE_URL}${ENDPOINT_FOR_RESET_PASSWORD}`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({password: password, token: token}),
        })
            .then(checkResponseIsSuccess)
            .then((data) => callback())
            .catch((error) => {
                errorHandler(dispatch, error)
            });
    }
}

export const refreshToken = (): ThunkActionType => {
    return (dispatch) => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_COOKIE)
        return fetch(`${BASE_URL}${ENDPOINT_FOR_REFRESH_TOKEN}`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({token: refreshToken}),
        })
            .then(checkResponseIsSuccess)
            .then((data) => {
                saveTokens(data.refreshToken, data.accessToken);
            })
            .catch((error) => {
                console.log("some throubles")
            });
    }
};

export const asyncSaveProfile = (name: string | null | undefined, email: string | null | undefined, password?: string | null | undefined) => {
    return function (dispatch: AppDispatch) {
        const headers: Headers = getAccessToken() ? new Headers({
                "Authorization": getAccessToken() ? getAccessToken()! : "",
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            })
            : new Headers(DEFAULT_HEADERS)

        var body: UserType = {
            "name": name ? name : "",
            "email": email ? email : "",
            "password": password ? password : ""
        }

        return fetch(`${BASE_URL}${ENDPOINT_FOR_USER}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(body),
        })
            .then(checkResponseIsSuccess)
            .then((data) => {
            })
            .catch((error) => {
                errorHandler(dispatch, error)
            });
    }
}