import { createStore, compose, applyMiddleware, combineReducers } from 'redux';

import { currentCardReducer } from "./reducers/cardReducer";
import { orderReducer } from "./reducers/orderReducer";
import { ingredientsReducer } from "./reducers/ingredientsReducer";
import errorReducer from "./reducers/errorReducer";
import { userReducer } from './reducers/userReducer';

import { thunk } from "redux-thunk";
import {socketMiddleware} from "./middleware/socket";
import {WsStoreActions, wsActionTypes} from "./types";
import {WS_URL} from "../components/utils/constants";
import {wsReducer} from "./reducers/wsReducer";

const rootReducer = combineReducers({
  card: currentCardReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
  error: errorReducer,
  user: userReducer,
  ws: wsReducer
});

const wsActions: WsStoreActions = {
  wsInit: wsActionTypes.CONNECTION_START,
  wsSendMessage: wsActionTypes.SEND_MESSAGE,
  onOpen: wsActionTypes.CONNECTION_SUCCESS,
  onClose: wsActionTypes.CONNECTION_CLOSED,
  onError: wsActionTypes.CONNECTION_ERROR,
  onMessage: wsActionTypes.GET_MESSAGE,
  onOrders: wsActionTypes.GET_ORDERS,
  wsClose: wsActionTypes.CLOSE
};


const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions, WS_URL)));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
