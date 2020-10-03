//      
import { call, put, takeEvery, delay } from "redux-saga/effects";
import { createAction, createReducer } from "@reduxjs/toolkit";
import produce from "immer";
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
  students: {
    firstGraders: {
      classOne: [
        { name: "김가렌", number: 0, phone: "010-1234-5678" },
        { name: "김가렌", number: 0, phone: "010-1234-5678" },
        { name: "김가렌", number: 0, phone: "010-1234-5678" },
        { name: "김가렌", number: 0, phone: "010-1234-5678" },
        { name: "김가렌", number: 0, phone: "010-1234-5678" },
      ],
    },
    secondGraders: {
      classOne: [{ name: "김가렌", number: 0, phone: "010-1234-5678" }],
    },
    thirdGraders: {
      classOne: [{ name: "김가렌", number: 0, phone: "010-1234-5678" }],
    },
  },
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getUserDataRequest, (state, action) => {
      // return produce(state, (draft) => {
      //   draft.isLoading = true;
      // });
      state.isLoading = true;
    })
    .addCase(getUserDataSuccess, (state, action) => {
      // return produce((state, draft) => {
      //   (draft.isLoading = false),
      //     (draft.students = {
      //       ...action.payload,
      //     });
      // });
      state.isLoading = false;
      state.students = {
        ...action.payload,
      };
    })
    .addCase(getUserDataError, (state, action) => {
      // return produce((state, draft) => {
      //   draft.isLoading = false;
      //   draft.students = null;
      // });
      state.isLoading = false;
      state.students = null;
    })
    .addDefaultCase((state, action) => {})
);

function* getUserDataAsync(action) {
  try {
    const useritem = yield call(getItem, "userdata");
    yield put(postUserInfoSuccess(useritem));
  } catch (error) {
    yield put(postUserInfoError());
  }
}

export function* dataSaga()         {
  yield takeEvery(GET_USERS_DATA_REQUEST, getUserDataAsync);
}
