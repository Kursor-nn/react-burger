import {IngredientType} from "../components/product-list/product-list";

export enum orderItemActionTypes {
    GET_ORDER_ITEM = "GET_ORDER_ITEM",
}

export enum wsActionTypes {
    CONNECTION_START = "CONNECTION_START",
    CONNECTION_SUCCESS = "CONNECTION_SUCCESS",
    CONNECTION_ERROR = "CONNECTION_ERROR",
    CONNECTION_CLOSED = "CONNECTION_CLOSED",
    GET_MESSAGE = "GET_MESSAGE",
    GET_ORDERS = "GET_ORDERS",
    SEND_MESSAGE = "SEND_MESSAGE",
    CLOSE = "CLOSE",
}

export interface WsOrderType {
    ingredients: string[];
    _id: string;
    status: string;
    name: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export interface WsNewOrderType {
    ingredients: IngredientType[];
    _id: string;
    status: string;
    name: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export interface WsDataType {
    success: boolean;
    orders: WsOrderType[];
    total: number;
    totalToday: number;
}

export interface WsConnectionStartType {
    readonly type: wsActionTypes.CONNECTION_START;
    readonly payload: string;
}

export interface WsConnectionSuccessActionType {
    readonly type: wsActionTypes.CONNECTION_SUCCESS;
}

export interface WsConnectionErrorActionType {
    readonly type: wsActionTypes.CONNECTION_ERROR;
    readonly payload: Event;
}

export interface WsConnectionClosedActionType {
    readonly type: wsActionTypes.CONNECTION_CLOSED;
}

export interface WsGetMessageActionType {
    readonly type: wsActionTypes.GET_MESSAGE;
    readonly payload: WsDataType;
}

export interface WsGetOrdersActionType {
    readonly type: wsActionTypes.GET_ORDERS;
    readonly payload: any;
}

export interface WsSendMessageActionType {
    readonly type: wsActionTypes.SEND_MESSAGE;
    readonly payload: { message: string };
}

export interface IWSCloseAction {
    readonly type: wsActionTypes.CLOSE;
}

export type TWSActions =
    | WsConnectionStartType
    | WsConnectionSuccessActionType
    | WsConnectionErrorActionType
    | WsConnectionClosedActionType
    | WsGetMessageActionType
    | WsSendMessageActionType
    | WsGetOrdersActionType
    | IWSCloseAction;

export type WsStoreActions = {
    wsInit: wsActionTypes.CONNECTION_START;
    wsSendMessage: wsActionTypes.SEND_MESSAGE;
    onOpen: wsActionTypes.CONNECTION_SUCCESS;
    onClose: wsActionTypes.CONNECTION_CLOSED;
    onError: wsActionTypes.CONNECTION_ERROR;
    onMessage: wsActionTypes.GET_MESSAGE;
    onOrders: wsActionTypes.GET_ORDERS;
    wsClose: wsActionTypes.CLOSE;
};

export type ActionType<TYPE, PAYLOAD> = {
    type: TYPE,
    payload: PAYLOAD,
    card: IngredientType | null
}

export type IngredientActionType<TYPE, PAYLOAD> = {
    type: TYPE,
    ingredients: PAYLOAD[],
    tab: string,
}

export type OrderActionType<TYPE> = {
    type: TYPE | null,
    order: IngredientType[]
    state: boolean | null
    position: number | null,
    orderNumber: number | null
    orderName: string | null
    ingredients: IngredientType[]
    ingredient: IngredientType | null
    bun: IngredientType | null
    show: boolean | null
}