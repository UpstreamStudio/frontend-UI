//      
import { turn } from "core-js/fn/array";
import produce from "immer";
import { call, put, takeEvery, delay, takeLatest } from "redux-saga/effects";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { postUser } from "./asyncUtils/AuthUtils";
import { saveItem } from "./asyncUtils/Asyncstorage";

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
    },
    status: "200",
  };
};

// 액션 타입
const POST_USER_INFO_REQUEST         = "userReducer/POST_USER_INFO_REQUEST";
const POST_USER_INFO_SUCCESS         = "userReducer/POST_USER_INFO_SUCCESS";
const POST_USER_INFO_ERROR         = "userReducer/POST_USER_INFO_ERROR";

                
                   
                   
                
                    
                      
                       
                
               
  

                                    
                                      
                   
  

// 액션 생성자

export const postUserInfoRequest = createAction(
  POST_USER_INFO_REQUEST,
  (username        , password        ) => {
    return {
      payload: {
        username,
        password,
      },
    };
  }
);

export const postUserInfoSuccess = createAction(
  POST_USER_INFO_SUCCESS,
  (data        ) => {
    return {
      payload: {
        ...data,
      },
    };
  }
);

export const postUserInfoError = createAction(
  POST_USER_INFO_ERROR,
  (error) => ({
    payload: {
      error: error,
    },
  })
);

// 초기 State
                    
                   
                   
                   
                     
                
                
                    
                      
                       
                   
             
               
  

const initialState              = {
  username: "",
  password: "",
  isLogin: false,
  isLoading: false,
  error: null,
  email: "",
  tokenType: "",
  accessToken: "",
  refreshToken: "",
  userdata: null,
  id: "",
  name: "",
};

function* postUserAsync(action) {
  const payload = action.payload;
  try {
    // {data, status} or error를 리턴
    // const { data, status } = yield call(
    //   postUser,
    //   "http://125.176.221.20:8080/api/auth/signin",
    //   { email: "eddysonkr@gmail.com", password: "12345678" }
    // );
    const { data, status } = yield call(asyncDummy);
    console.log(data);
    yield call(saveItem, "userdata", data);
    yield put(postUserInfoSuccess(data));
  } catch (e) {
    yield put(postUserInfoError(e));
  }
}

export function* userSaga()         {
  yield takeLatest(POST_USER_INFO_REQUEST, postUserAsync);
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(postUserInfoRequest, (state, action) => {
      state.isLoading = true;
      state.isLogin = false;
      state.error = null;
    })
    .addCase(postUserInfoSuccess, (state, action) => {
      const {
        // username,
        email,
        tokenType,
        accessToken,
        // refreshToken,
        // userdata,
        id,
        name,
      } = action.payload;

      state.isLoading = false;
      state.isLogin = true;
      state.error = null;
      // state.username = username;
      state.email = email;
      state.tokenType = tokenType;
      state.accessToken = accessToken;
      // state.refreshToken = refreshToken;
      // state.userdata = userdata;
      (state.id = id), (state.name = name);
    })
    .addCase(postUserInfoError, (state, action) => {
      state.isLogin = false;
      state.isLoading = false;
      state.error = action.payload.error;
    })
    .addDefaultCase((state, action) => {});
});
