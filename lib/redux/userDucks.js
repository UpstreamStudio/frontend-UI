//      
import { turn } from "core-js/fn/array";
import produce from "immer";
import { call, put, takeEvery, delay } from "redux-saga/effects";
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
          classOne: [{ name: "김가렌", number: 1, phone: "010-3553-2136" }],
        },
      },
    },
    status: "200",
  };
};

// 액션 타입
const POST_USER_INFO_REQUEST         = "userReducer/POST_USER_INFO";
const POST_USER_INFO_SUCCESS         = "userReducer/POST_USER_INFO_SUCCESS";
const POST_USER_INFO_ERROR         = "userReducer/POST_USER_INFO_ERROR";

                
                   
                   
                
                    
                      
                       
                
               
  

                                    
                                      
                   
  

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
  (username        , password        ) => {
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
  (data        ) => {
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
};

function* postUserAsync(action) {
  const payload = action.payload;
  try {
    // {data, status} or error를 리턴
    const { data, status } = yield call(asyncDummy);
    yield call(saveItem, "userdata", data);
    yield put(postUserInfoSuccess(data));
  } catch (e) {
    yield put(postUserInfoError(e));
  }
}

export function* userSaga()         {
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

export default createReducer(initialState, (builder) => {
  builder
    .addCase(postUserInfoRequest, (state, action) => {
      // return produce(state, (draft) => {
      //   (draft.isLoading = true), (draft.isLogin = false), (draft.error = null);
      // });
      state.isLoading = true;
      state.isLogin = false;
      state.error = null;
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

      state.isLoading = false;
      state.isLogin = true;
      state.error = null;
      state.username = username;
      state.email = email;
      state.tokenType = tokenType;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.userdata = userdata;

      // return produce((state, draft) => {
      //   (draft.isLogin = true),
      //     (draft.isLoading = false),
      //     (draft.error = null),
      //     (draft.username = username),
      //     (draft.email = email),
      //     (draft.tokenType = tokenType),
      //     (draft.accessToken = accessToken),
      //     (draft.refreshToken = refreshToken),
      //     (draft.userdata = userdata);
      // });
    })
    .addCase(postUserInfoError, (state, action) => {
      // return produce((state, draft) => {
      //   (draft.isLoading = false),
      //     (draft.isLogin = false),
      //     (draft.error = action.payload.error);
      // });
      state.isLogin = false;
      state.isLoading = false;
      state.error = action.payload.error;
    })
    .addDefaultCase((state, action) => {});
});
