// @flow
import React from "react";
import { SafeAreaView, View, Platform } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { useSafeArea } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import UserListContainer from "../containerScreens/UserListContainer";
import ClassGroupContainer from "../containerScreens/ClassGroupConatiner";

const { Screen, Navigator } = createStackNavigator();

export const UserStack = () => {
  return (
    <Navigator initialRouteName="userListHome">
      <Screen
        options={{ headerShown: false }}
        name="userListHome"
        component={UserListContainer}
      ></Screen>
      <Screen
        options={{ headerShown: false }}
        name="userListClass"
        component={ClassGroupContainer}
      ></Screen>
    </Navigator>
  );
};
