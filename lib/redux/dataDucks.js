//      
import produce from "immer";
import { call, put, takeEvery, delay, takeLatest } from "redux-saga/effects";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { getItem } from "./asyncUtils/Asyncstorage";
import { postUserInfoError, postUserInfoSuccess } from "../../lib/redux/user";

const GET_USERS_DATA_REQUEST         = "dataReducer/GET_USER_DATA_REQUEST";
const GET_USERS_DATA_SUCCESS         = "dataReducer/GET_USER_DATA_SUCCESS";
const GET_USERS_DATA_ERROR         = "dataReducer/GET_USER_DATA_ERROR";

export const getUserDataRequest = createAction(GET_USERS_DATA_REQUEST);
export const getUserDataSuccess = createAction(
  GET_USERS_DATA_SUCCESS,
  (data) => ({
    payload: {
      data: Object,
    },
  })
);
export const getUserDataError = createAction(GET_USERS_DATA_ERROR, (error) => ({
  payload: {
    error: Object,
  },
}));

const initialState = {
  isLoading: false,
  students: {},
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getUserDataRequest, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getUserDataSuccess, (state, action) => {
      state.isLoading = false;
      state.students = {
        ...action.payload.data,
      };
    })
    .addCase(getUserDataError, (state, action) => {
      state.isLoading = false;
      state.students = null;
    })
    .addDefaultCase((state, action) => {})
);

function* getUserDataAsync(action) {
  try {
    const useritem = yield call(getItem, "userdata");
    yield put(getUserDataSuccess(useritem));
  } catch (error) {
    yield put(getUserDataError());
  }
}

export function* dataSaga()         {
  yield takeLatest(GET_USERS_DATA_REQUEST, getUserDataAsync);
}
