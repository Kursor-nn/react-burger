export const BASE_URL = "https://norma.nomoreparties.space/api/";

export const INGREDIENTS_URL = BASE_URL + "ingredients";
export const MAKE_ORDER_URL = BASE_URL + "orders";

export const COMPONENT_DND_TYPE = "component";
export const INGREDIENT_DND_TYPE = "ingredient";

export const DEFAULT_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export const BUN_TAB = "bun"
export const SAUCE_TAB = "sauce"
export const MAIN_TAB = "main"

export const MAIN_PATH = "/"
export const REGISTER_PATH = "/register"
export const LOGIN_PATH = "/login"
export const FORGOT_PASSWORD_PATH = "/forgot-password"
export const RESET_PASSWORD_PATH = "/reset-password"
export const PROFILE_PATH = "/profile"
export const PROFILE_ORDERS_PATH = "/profile/orders"
export const ORDERS_PATH = "/orders"
export const INGREDIENT_PATH = "/ingredients/:id"
export const ERROR_PATH = "*"