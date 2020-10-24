// @flow
import React from "react";
import { SafeAreaView, View, Platform } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import {BoardHome} from './BoardHome.component';
import {BoardScreen} from './BoardScreen.component';
import {ArticleScreen} from './Article.component';

const { Screen, Navigator } = createStackNavigator();

export const BoardStack = () => {
  return (
    <Navigator initialRouteName="BoardHome">
      <Screen
        options={{ headerShown: false }}
        name="BoardHome"
        component={BoardHome}
      ></Screen>
      <Screen
        options={{ headerShown: false }}
        name="BoardScreen"
        component={BoardScreen}
      ></Screen>
      <Screen
        options={{ headerShown: false }}
        name="ArticleScreen"
        component={ArticleScreen}
      ></Screen>
    </Navigator>
  );
};
