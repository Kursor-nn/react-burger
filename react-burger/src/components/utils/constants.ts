export const BASE_URL = "https://norma.nomoreparties.space/api/";

export const INGREDIENTS_URL: string = BASE_URL + "ingredients";
export const MAKE_ORDER_URL: string = BASE_URL + "orders";

export const COMPONENT_DND_TYPE: string = "component";
export const INGREDIENT_DND_TYPE: string = "ingredient";

export const DEFAULT_HEADERS: { [id: string]: string; } = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export const BUN_TAB: string = "bun"
export const SAUCE_TAB: string = "sauce"
export const MAIN_TAB: string = "main"

export const MAIN_PATH: string = "/"
export const REGISTER_PATH: string = "/register"
export const LOGIN_PATH: string = "/login"
export const FORGOT_PASSWORD_PATH: string = "/forgot-password"
export const RESET_PASSWORD_PATH: string = "/reset-password"
export const PROFILE_PATH: string = "/profile"
export const PROFILE_ORDERS_PATH: string = "/profile/orders"
export const ORDERS_PATH: string = "/orders"
export const INGREDIENT_PATH: string = "/ingredients/:id"
export const ERROR_PATH: string = "*"