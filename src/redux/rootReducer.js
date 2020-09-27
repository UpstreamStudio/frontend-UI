import { combineReducers } from "redux";
import userReducer, { userSaga } from "./user";
import { all, fork } from "redux-saga/effects";

const rootReducer = combineReducers({
  userReducer,
});

export function* rootSaga() {
  yield all([userSaga()]);
}

export default rootReducer;
