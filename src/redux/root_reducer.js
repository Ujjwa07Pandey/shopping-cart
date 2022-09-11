import { combineReducers } from "redux";
import { productsReducer } from "./products/ducks";
import { notificationsReducer } from "./notifications/ducks";
const rootReducer = combineReducers({
  products: productsReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
