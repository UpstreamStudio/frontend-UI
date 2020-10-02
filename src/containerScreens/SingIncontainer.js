// @flow
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignInScreen } from "../presentScreens/Authcomponents/SignIn.component";
import { postUserInfoRequest } from "../redux/userDucks";
import { Spinner } from "@ui-kitten/components";
import { View } from "react-native";

function SignInContainer() {
  // 현재 state를 조회
  const { username, password, isLogin, isLoading } = useSelector((state) => ({
    username: state.userReducer.username,
    password: state.userReducer.password,
    isLogin: state.userReducer.isLogin,
    isLoading: state.userReducer.isLoading,
  }));

  const renderLoading = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </View>
    );
  };

  useEffect(() => {
    return console.log("signinrerendered!");
  });

  // dispatch 생성 hook
  const dispatch = useDispatch();
  const onSignIn = (username, password) =>
    dispatch(postUserInfoRequest(username, password));

  // useEffect(() => {
  //   dispatch({ type: null });
  // }, [dispatch]);

  return isLoading ? renderLoading() : <SignInScreen onSignIn={onSignIn} />;
}

export default SignInContainer;
