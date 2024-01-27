import { authReducer } from "./Auth/Reducer";

import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { customerProductReducer } from "./Products/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { alertReducer } from "./Alert/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  product: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  alert: alertReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
