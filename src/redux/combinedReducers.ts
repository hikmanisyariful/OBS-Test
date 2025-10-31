import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./reducers/users";
import alertReducer from "./reducers/alert";

const combinedReducers = combineReducers({
  users: usersReducer,
  alert: alertReducer,
});

export default combinedReducers;
