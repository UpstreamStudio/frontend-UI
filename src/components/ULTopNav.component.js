// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from "@ui-kitten/components";

const MenuIcon = (props) => (
  <Icon {...props} fill="#fff" name="more-vertical" />
);

const InfoIcon = (props) => <Icon {...props} name="info" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

const SearchIcon = (props) => (
  <Icon {...props} fill="#fff" name="search-outline" />
);

export const ULTopNav = () => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const theme = useTheme();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const RenderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const RenderSearchAction = () => <TopNavigationAction icon={SearchIcon} />;

  const RenderRightMenuActions = () => (
    <React.Fragment>
      <RenderSearchAction />
      <OverflowMenu
        anchor={RenderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );

  const RenderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar style={styles.logo} source={require("../../assets/icon.png")} />
      <Text {...props}>학생목록</Text>
    </View>
  );

  return (
    <TopNavigation
      title={RenderTitle}
      accessoryRight={RenderRightMenuActions}
      style={{ backgroundColor: theme["color-success-800"] }}
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginHorizontal: 16,
  },
});
