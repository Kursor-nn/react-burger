import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { currentCardReducer } from "./reducers/cardReducer";
import { orderReducer } from "./reducers/orderReducer";
import { ingredientsReducer } from "./reducers/ingredientsReducer";
import errorReducer from "./reducers/errorReducer";

const rootReducer = combineReducers({
  card: currentCardReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
  error: errorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});

export default store


