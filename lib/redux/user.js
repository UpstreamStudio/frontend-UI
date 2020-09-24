//      

import { turn } from "core-js/fn/array";

// 액션 타입
const SIGNIN         = "user/SIGNIN";

               
                      
                   
  

                
             
             
  

// 액션 생성자
export const signInAction = (id         = "", pw         = "") => {
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
                  
             
             
                   
  

const userState            = {
  id: "",
  pw: "",
  isLogin: true,
};

// 리듀서 생성
export default function user(state            = userState, action        ) {
  switch (action.type) {
    case SIGNIN:
    // 비동기 처리

    default:
      return state;
  }
}
