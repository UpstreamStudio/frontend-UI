// @flow
import { turn } from "core-js/fn/array";
import axios from "axios";
import produce from "immer";
import { call, put, takeEvery, delay } from "redux-saga/effects";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { postUser } from "./asyncUtils/AuthUtils";
import userReducer from "../../lib/redux/user";
import { saveItem } from "./asyncUtils/Asyncstorage";
new Map()
// 더미 프로미스 함수
const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));
const asyncDummy = async () => {
  await sleep(3000);
  return {
    data: {
      username: "demo",
      email: "demo@naver.com",
      tokenType: "JWT",
      accessToken: "demo",
      refreshToken: "demo",
      userdata: {
        "1학년": {
          "1반": [{ 이름: "김가렌", 출석번호: 1, 전화번호: "010-3553-2136" }],
        },
      },
    },
    status: "200",
  };
};

// 액션 타입
const SIGN_IN: string = "userReducer/SIGN_IN";
const POST_USER_INFO_REQUEST: string = "userReducer/POST_USER_INFO";
const POST_USER_INFO_SUCCESS: string = "userReducer/POST_USER_INFO_SUCCESS";
const POST_USER_INFO_ERROR: string = "userReducer/POST_USER_INFO_ERROR";

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
// export const postUserInfoRequest = (
//   username: string = "",
//   password: string = ""
// ) => {
//   const action = {
//     type: POST_USER_INFO_REQUEST,
//     payload: {
//       username,
//       password,
//     },
//   };

//   return action;
// };
export const postUserInfoRequest = createAction(
  POST_USER_INFO_REQUEST,
  (username: String, password: string) => {
    return {
      payload: {
        username,
        password,
      },
    };
  }
);

// export const postUserInfoSuccess = (response: Object) => {
//   const {
//     username,
//     email,
//     tokenType,
//     accessToken,
//     refreshToken,
//     data,
//   } = response;
//   const action = {
//     type: POST_USER_INFO_SUCCESS,
//     payload: {
//       username,
//       email,
//       tokenType,
//       accessToken,
//       refreshToken,
//       data,
//     },
//   };

//   return action;
// };

export const postUserInfoSuccess = createAction(
  POST_USER_INFO_SUCCESS,
  (data: Object) => {
    return {
      payload: {
        ...data,
      },
    };
  }
);

// export const postUserInfoError = (error: Object) => {
//   const action = {
//     type: POST_USER_INFO_ERROR,
//     payload: {
//       error,
//     },
//   };

//   return action;
// };

export const postUserInfoError = createAction(
  POST_USER_INFO_ERROR,
  (error) => ({
    payload: {
      error: error,
    },
  })
);

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
    const { data, status } = yield call(asyncDummy);
    yield call(saveItem.bind("data", data));
    yield put(postUserInfoSuccess(data));
  } catch (e) {
    yield put(postUserInfoError(e));
  }
}

export function* userSaga(): Object {
  yield takeEvery(POST_USER_INFO_REQUEST, postUserAsync);
}

// 리듀서 생성
// export default function userReducer(
//   state: userstate = userState,
//   action: POST_USER_INFO_REQUEST_TYPE
// ) {
//   switch (action.type) {
//     case POST_USER_INFO_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//         isLogin: false,
//         error: null,
//       };
//     case POST_USER_INFO_SUCCESS:
//       return {
//         ...state,
//         isLogin: true,
//         isLoading: false,
//         error: null,
//         username: action.payload.username,
//         email: action.payload.email,
//         tokenType: action.payload.tokenType,
//         accessToken: action.payload.accessToken,
//         refreshToken: action.payload.refreshToken,
//         data: action.payload.data,
//       };
//     case POST_USER_INFO_ERROR:
//       return {
//         ...state,
//         isLoading: false,
//         isLogin: false,
//    dta     error: action.payload.error,
//       };

//     default:
//       return state;
//   }
// }

export default createReducer(userState, (builder) => {
  builder
    .addCase(postUserInfoRequest, (state, action) => {
      return produce(state, (draft) => {
        (draft.isLoading = true), (draft.isLogin = false), (draft.error = null);
      });
    })
    .addCase(postUserInfoSuccess, (state, action) => {
      const {
        username,
        email,
        tokenType,
        accessToken,
        refreshToken,
        userdata,
      } = action.payload;

      return produce((state, draft) => {
        (draft.isLogin = true),
          (draft.isLoading = false),
          (draft.error = null),
          (draft.username = username),
          (draft.email = email),
          (draft.tokenType = tokenType),
          (draft.accessToken = accessToken),
          (draft.refreshToken = refreshToken),
          (draft.userdata = userdata);
      });
    })
    .addCase(postUserInfoError, (state, action) => {
      return produce((state, draft) => {
        (draft.isLoading = false),
          (draft.isLogin = false),
          (draft.error = action.payload.error);
      });
    })
    .addDefaultCase((state, action) => {
      return state;
    });
});
