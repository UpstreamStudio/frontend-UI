//      
import React, { useEffect } from "react";
import { AuthStack } from "../presentScreens/Auths/AuthStack.component";
import { AppNavigator } from "../presentScreens/AppNav.component";
import { useSelector, useDispatch } from "react-redux";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { ThemeContext } from "../theme-context";
import {Rnaudio} from '../presentScreens/Rnaudiostreamer';

function AppContainer() {
  const { username, password, isLogin } = useSelector((state) => ({
    username: state.userReducer.username,
    password: state.userReducer.password,
    isLogin: state.userReducer.isLogin,
  }));

  // const themeContext = React.useContext(ThemeContext);

  return <>{isLogin ? <AppNavigator /> : <Rnaudio />}</>;
}

export default AppContainer;
