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
import { ULScreen } from "./UserList.component";
import {
  initialWindowSafeAreaInsets,
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// icons
const PeopleIcon = (props) => <Icon {...props} name="people-outline" />;
const ListIcon = (props) => <Icon {...props} name="list-outline" />;
const BellIcon = (props) => <Icon {...props} name="bell-outline" />;
const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  const insets = useSafeAreaInsets();

  const style = {
    bottomNav: {
      paddingBottom: insets.bottom,
    },
  };
  return (
    <BottomNavigation
      style={style.bottomNav}
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="학생목록" icon={PeopleIcon} />
      <BottomNavigationTab title="게시판" icon={ListIcon} />
      <BottomNavigationTab title="알림" icon={BellIcon} />
      <BottomNavigationTab title="홈" icon={HomeIcon} />
    </BottomNavigation>
  );
};

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Users" component={ULScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
