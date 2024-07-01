import { setErrorMessage } from "../actions/errorActions"

import { ThunkAction } from "redux-thunk"
import { Action } from "redux"
import { RootState } from "../init"
import { BASE_URL } from "../../components/utils/constants"

import { DEFAULT_HEADERS } from "../../components/utils/constants"
import { setUser } from "../actions/userActions";
import { setCookie, getAccessToken } from "../../components/utils/cookies"

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "../../components/utils/cookies"

import { ErrorNotification, InfoNotification } from "../../components/notifications/notification"

export const ENDPOINT_FOR_LOGIN = "auth/login";
export const ENDPOINT_FOR_REGISTER = "auth/register";
export const ENDPOINT_FOR_USER = "auth/user";
export const ENDPOINT_FOR_LOGOUT = "auth/logout";
export const ENDPOINT_FOR_REFRESH_TOKEN = "auth/token";
export const ENDPOINT_FOR_FORGOT_PASSWORD = "password-reset";
export const ENDPOINT_FOR_RESET_PASSWORD = "password-reset/reset";

type ThunkActionType = ThunkAction<void, RootState, unknown, Action>;

const errorHandler = (dispatch: any, error: any = null) => {
    if (error) {
        console.log("Error", error);
    }
    dispatch(setErrorMessage("У нас лапки."))
    ErrorNotification("У нас лапки.");
}

const checkResponseIsSuccess = (res: any) => {
    return (res.ok) ? res.json() : Promise.reject(res.json())
}

export const saveTokens = (refreshToken: string, accessToken: string) => {
    setCookie(ACCESS_TOKEN_COOKIE, accessToken);
    localStorage.setItem(REFRESH_TOKEN_COOKIE, refreshToken);
};


export const asyncLoadUser = () => {
    return function (dispatch: any) {
        const accessTokenIsExists = (getAccessToken() && getAccessToken() !== "")
        if(!accessTokenIsExists) return;


        const headers: any = accessTokenIsExists ? {
            "Authorization": getAccessToken(),
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        } : new Headers(DEFAULT_HEADERS)

        return fetch(`${BASE_URL}${ENDPOINT_FOR_USER}`,
            {
                method: "GET",
                headers: headers
            })
            .then(checkResponseIsSuccess)
            .then((data) => {
                if (data.success) {
                    console.log("asyncLoadUser: success", data);
                    if (data.user) {
                        dispatch(setUser(data.user));
                    }
                    if (data.refreshToken && data.accessToken) {
                        saveTokens(data.refreshToken, data.accessToken);
                    }
                } else {
                    console.log("asyncLoadUser: failed", data);
                    if (data.message === "jwt expired") {
                        dispatch(refreshToken())
                        dispatch(asyncLoadUser())
                    }
                }
            })
            .catch((error) => {
                error.then((errorResponse: any) => {
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

export const asyncLogin = (email: string, password: string, callback: any) => {
    return function (dispatch: any) {
        return fetch(`${BASE_URL}${ENDPOINT_FOR_LOGIN}`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({ email: email, password: password }),
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
            .catch((error: any) => {
                error.then((data: any) => {
                    ErrorNotification(data);
                })
            });
    }
}

export const asyncLogout = (callback: any): ThunkActionType => {
    return function (dispatch: any) {
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

export const asyncRegister = (email: string, password: string, name: string, callback: any) => {
    return function (dispatch: any) {
        return fetch(`${BASE_URL}${ENDPOINT_FOR_REGISTER}`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({ email: email, password: password, name: name }),
        })
            .then(checkResponseIsSuccess)
            .then((data) => {
                dispatch(setUser(data.user));
                saveTokens(data.refreshToken, data.accessToken);
                callback()
            })
            .catch((error) => {
                error.then((errorData: any) => {
                    ErrorNotification(errorData);
                })
            });
    }
}

export const imForgotPassword = (email: string, callback: any) => {
    return function (dispatch: any) {
        return fetch(`${BASE_URL}${ENDPOINT_FOR_FORGOT_PASSWORD}`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({ email: email }),
        })
            .then(checkResponseIsSuccess)
            .then((data) => callback())
            .catch((error) => {
                errorHandler(dispatch, error)
            });
    }
}

export const resetPassword = (password: string, token: string, callback: any) => {
    return function (dispatch: any) {
        return fetch(`${BASE_URL}${ENDPOINT_FOR_RESET_PASSWORD}`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({ password: password, token: token }),
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
            body: JSON.stringify({ token: refreshToken }),
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
    return function (dispatch: any) {
        const headers: any = getAccessToken() ? {
            "Authorization": getAccessToken(),
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        } : new Headers(DEFAULT_HEADERS)

        var body: any = {}
        if (name) {
            body["name"] = name;
        }
        if (email) {
            body["email"] = email;
        }
        if (password) {
            body["password"] = password;
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