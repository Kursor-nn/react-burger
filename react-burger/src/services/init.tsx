import { createStore, compose, applyMiddleware, combineReducers } from 'redux';

import { currentCardReducer } from "./reducers/cardReducer";
import { orderReducer } from "./reducers/orderReducer";
import { ingredientsReducer } from "./reducers/ingredientsReducer";
import errorReducer from "./reducers/errorReducer";
import { userReducer } from './reducers/userReducer';

import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  card: currentCardReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
  error: errorReducer,
  user: userReducer
});

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
