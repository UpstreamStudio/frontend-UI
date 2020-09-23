// @flow

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
} from "@ui-kitten/components";

// icons
const PeopleIcon = (props) => <Icon {...props} name="people-outline" />;
const ListIcon = (props) => <Icon {...props} name="list-outline" />;
const BellIcon = (props) => <Icon {...props} name="bell-outline" />;
const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="학생목록" icon={PeopleIcon} />
    <BottomNavigationTab title="게시판" icon={ListIcon} />
    <BottomNavigationTab title="알림" icon={BellIcon} />
    <BottomNavigationTab title="홈" icon={HomeIcon} />
  </BottomNavigation>
);

const tabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    {/*
      스크린은 여기 
    */}
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <tabNavigator />
  </NavigationContainer>
);
