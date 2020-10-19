//      
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInContainer from "../../containerScreens/SingIncontainer";

const { Navigator, Screen } = createStackNavigator();

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="Signin"
          component={SignInContainer}
          options={{ headerShown: false }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
