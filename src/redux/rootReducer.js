import { combineReducers } from "redux";
import userReducer, { userSaga } from "./userDucks";
import dataReducer, { dataSaga } from "./dataDucks";
import { all, fork } from "redux-saga/effects";

const rootReducer = combineReducers({
  userReducer,
  dataReducer,
});

export function* rootSaga() {
  yield all([userSaga(), dataSaga()]);
}

export default rootReducer;
