//      
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
const SIGN_IN         = "user/SIGN_IN";
const POST_USER_INFO_REQUEST         = "user/POST_USER_INFO";
const POST_USER_INFO_SUCCESS         = "user/POST_USER_INFO_SUCCESS";
const POST_USER_INFO_ERROR         = "user/POST_USER_INFO_ERROR";

                
                   
                   
                
                    
                      
                       
                
               
  

                                    
                                      
                   
  

// 액션 생성자
export const postUserInfoRequest = (
  username         = "",
  password         = ""
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

export const postUserInfoSuccess = (response        ) => {
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

export const postUserInfoError = (error        ) => {
  const action = {
    type: POST_USER_INFO_ERROR,
    payload: {
      error,
    },
  };

  return action;
};

// 초기 State
                  
                   
                   
                   
                     
                
  

const userState            = {
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

export function* userSaga()         {
  yield takeEvery(POST_USER_INFO_REQUEST, postUserAsync);
}

// 리듀서 생성
export default function userReducer(
  state            = userState,
  action                             
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
