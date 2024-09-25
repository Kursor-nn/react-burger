import type {AnyAction, Middleware, MiddlewareAPI} from "redux";
import {WsStoreActions} from "../types";
import {AppDispatch} from "../../hooks/useTypedSelector";
import {RootState} from "../init";

export const socketMiddleware = (wsActions: WsStoreActions, wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action: AnyAction) => {
            const {dispatch, getState} = store;
            const {type, payload} = action;
            const {wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, wsClose} = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(`${wsUrl}${payload}`);
            }
            if (socket) {
                socket.onopen = (event) => {
                    dispatch({type: onOpen, payload: event});
                };

                socket.onerror = (event) => {
                    dispatch({type: onError, payload: event});
                };

                socket.onmessage = (event) => {
                    const {data} = event;
                    dispatch({
                        type: onMessage,
                        payload: JSON.parse(data),
                    });
                };

                socket.onclose = (event) => {
                    dispatch({type: onClose, payload: event});
                };
                if (type === wsSendMessage) {
                    socket.send(JSON.stringify(payload));
                }
            }

            if (type === wsClose) {
                socket?.close();
            }

            next(action);
        };
    }) as Middleware;
};