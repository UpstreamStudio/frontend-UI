//      
import React from "react";
import { AuthStack } from "../presentScreens/Authcomponents/AuthStack.component";
import { AppNavigator } from "../presentScreens/AppNav.component";
import { useSelector, useDispatch } from "react-redux";

function AppContainer() {
  const { username, password, isLogin } = useSelector((state) => ({
    username: state.userReducer.username,
    password: state.userReducer.password,
    isLogin: state.userReducer.isLogin,
  }));

  return <>{isLogin ? <AppNavigator /> : <AuthStack />}</>;
}

export default AppContainer;
