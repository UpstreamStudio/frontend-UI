// @flow

// 액션 타입
const SIGNIN: string = "user/SIGNIN";

type action = {
  type: typeof SIGNIN,
  payload: payload,
};

type payload = {
  id: string,
  pw: string,
};

// 액션 생성자
export const signInAction = (id: string = "", pw: string = "") => {
  const action = {
    type: SIGNIN,
    payload: {
      id,
      pw,
    },
  };

  return action;
};

// 초기 State
type userstate = {
  id: string,
  pw: string,
  isLogin: boolean,
};

const userState: userstate = {
  id: "",
  pw: "",
  isLogin: false,
};

// 리듀서 생성
export default function user(state: userstate, action: action) {
  switch (action.type) {
    case SIGNIN:
    // 비동기 처리

    default:
      return state;
  }
}
