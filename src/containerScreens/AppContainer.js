// @flow
import React from "react";
import { AuthStack } from "../presentScreens/Authcomponents/AuthStack.component";
import { AppNavigator } from "../presentScreens/AppNav.component";
import { useSelector, useDispatch } from "react-redux";

function AppContainer() {
  const { id, pw, isLogin } = useSelector((state) => ({
    id: state.user.id,
    pw: state.user.pw,
    isLogin: state.user.isLogin,
  }));

  return <>{isLogin ? <AppNavigator /> : <AuthStack />}</>;
}

export default AppContainer;
