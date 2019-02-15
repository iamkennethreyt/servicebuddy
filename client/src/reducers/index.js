import { combineReducers } from "redux";
import authReducer from "./authReducer";
import workers from "./workersReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  workers: workers,
  errors: errorReducer
});
