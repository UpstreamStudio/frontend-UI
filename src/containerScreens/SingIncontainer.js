// @flow
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignInScreen } from "../presentScreens/Authcomponents/SignIn.component";
import { signInAction } from "../redux/user";

function SignInContainer() {
  // 현재 state를 조회
  const { id, pw, isLogin } = useSelector((state) => ({
    id: state.user.id,
    pw: state.user.pw,
    isLogin: state.user.isLogin,
  }));

  // dispatch 생성 hook
  const dispatch = useDispatch();
  const onSignIn = (id, pw) => dispatch(signInAction(id, pw));

  return <SignInScreen onSignIn={onSignIn} />;
}

export default SignInContainer;
