import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import chatReducer from "./chatReducer";
export const reducers = combineReducers({
  authReducer,
  postReducer,
  chatReducer,
});
