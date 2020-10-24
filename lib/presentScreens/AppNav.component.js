//      
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
  useTheme,
} from "@ui-kitten/components";
import {
  initialWindowSafeAreaInsets,
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Keyboard } from 'react-native';
import { useNavigationState } from "@react-navigation/native";
import { ULScreen } from "./Users/UserList.component";
import { UserStack } from "./Users/UserStack.component";
import {BoardStack} from './Boards/BoardStack.component';

// icons
const PeopleIcon = (props) => <Icon {...props} name="people-outline" />;
const ListIcon = (props) => <Icon {...props} name="list-outline" />;
const BellIcon = (props) => <Icon {...props} name="bell-outline" />;
const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const MessageIcon = (props) => <Icon {...props} name="message-circle" />;

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  const [visible, setVisible] = React.useState(true);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const style = {
    bottomNav: {
      paddingBottom: insets.bottom,
    },
  };

  const handleKeyboardShow = () => {
    setVisible(false);
  }
  const handleKeyboardHide = () => {
    setVisible(true);
  }

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
    
    return (
      () => {
      Keyboard.removeListener('keyboardDidShow');
      Keyboard.removeListener('keyboardDidHide');
      }
    )
  },[])

  return (
    visible ?
    <BottomNavigation
      indicatorStyle={{ backgroundColor: theme["color-primary-500"] }}
      style={style.bottomNav}
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="최신글" icon={HomeIcon} />
      <BottomNavigationTab title="게시판" icon={ListIcon} />
      <BottomNavigationTab title="채팅" icon={MessageIcon} />
      <BottomNavigationTab title="동료" icon={PeopleIcon} />
      <BottomNavigationTab title="알림" icon={BellIcon} />
    </BottomNavigation>
    :
    null
  );
};

const TabNavigator = () => (
  <Navigator
    initialRouteName="동료"
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen name="최신글" component={ULScreen} />
    <Screen name="게시판" component={BoardStack} />
    <Screen name="채팅" component={ULScreen} />
    <Screen name="동료" component={UserStack} />
    <Screen name="알림" component={ULScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
