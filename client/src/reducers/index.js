import { combineReducers } from "redux";
import authReducer from "./authReducer";
import workers from "./workersReducer";
import errorReducer from "./errorReducer";
import workertypes from "./workertypesReducer";
import advertisements from "./advertisementsReducer";

export default combineReducers({
  auth: authReducer,
  workers: workers,
  errors: errorReducer,
  workertypes: workertypes,
  advertisements: advertisements
});
