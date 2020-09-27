// @flow
import { turn } from "core-js/fn/array";
import { call, put, takeEvery, delay } from "redux-saga/effects";
import axios from "axios";
import { postUser } from "./asyncUtils/postuser";

// 더미 프로미스 함수
const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));
const asyncDummy = async () => {
  await sleep(3000);
  return {
    username: "demo",
    email: "demo@naver.com",
    tokenType: "JWT",
    accessToken: "demo",
    refreshToken: "demo",
    data: {
      "1학년": {
        "1반": [{ 이름: "김가렌", 출석번호: 1, 전화번호: "010-3553-2136" }],
      },
    },
  };
};

// 액션 타입
const SIGN_IN: string = "user/SIGN_IN";
const POST_USER_INFO_REQUEST: string = "user/POST_USER_INFO";
const POST_USER_INFO_SUCCESS: string = "user/POST_USER_INFO_SUCCESS";
const POST_USER_INFO_ERROR: string = "user/POST_USER_INFO_ERROR";

type payload = {
  username: string,
  password: string,
  email: String,
  tokenType: String,
  accessToken: String,
  refreshToken: String,
  error: Object,
  data: Object,
};

type POST_USER_INFO_REQUEST_TYPE = {
  type: typeof POST_USER_INFO_REQUEST,
  payload: payload,
};

// 액션 생성자
export const postUserInfoRequest = (
  username: string = "",
  password: string = ""
) => {
  const action = {
    type: POST_USER_INFO_REQUEST,
    payload: {
      username,
      password,
    },
  };

  return action;
};

export const postUserInfoSuccess = (response: Object) => {
  const {
    username,
    email,
    tokenType,
    accessToken,
    refreshToken,
    data,
  } = response;
  const action = {
    type: POST_USER_INFO_SUCCESS,
    payload: {
      username,
      email,
      tokenType,
      accessToken,
      refreshToken,
      data,
    },
  };

  return action;
};

export const postUserInfoError = (error: Object) => {
  const action = {
    type: POST_USER_INFO_ERROR,
    payload: {
      error,
    },
  };

  return action;
};

// 초기 State
type userstate = {
  username: string,
  password: string,
  isLogin: boolean,
  isLoading: boolean,
  error: Object,
};

const userState: userstate = {
  username: "",
  password: "",
  isLogin: false,
  isLoading: false,
  error: null,
};

function* postUserAsync(action) {
  const payload = action.payload;
  try {
    // {data, status} or error를 리턴
    const response = yield call(asyncDummy);
    yield put(postUserInfoSuccess(response));
  } catch (e) {
    yield put(postUserInfoError(e));
  }
}

export function* userSaga(): Object {
  yield takeEvery(POST_USER_INFO_REQUEST, postUserAsync);
}

// 리듀서 생성
export default function userReducer(
  state: userstate = userState,
  action: POST_USER_INFO_REQUEST_TYPE
) {
  switch (action.type) {
    case POST_USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLogin: false,
        error: null,
      };
    case POST_USER_INFO_SUCCESS:
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        error: null,
        username: action.payload.username,
        email: action.payload.email,
        tokenType: action.payload.tokenType,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        data: action.payload.data,
      };
    case POST_USER_INFO_ERROR:
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
