import { combineReducers } from "redux";
import userReducer, { userSaga } from "./userDucks";
import dataReducer, { dataSaga } from "./dataDucks";
import themeReducer, {themeSaga} from '../redux/themeDucks';
import { all, fork } from "redux-saga/effects";

const rootReducer = combineReducers({
  userReducer,
  dataReducer,
  themeReducer
});

export function* rootSaga() {
  yield all([userSaga(), dataSaga(), themeSaga()]);
}

export default rootReducer;
