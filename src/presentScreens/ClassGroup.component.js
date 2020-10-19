// @flow
import React from "react";
import { View } from "react-native";
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button,
  List,
  ListItem,
} from "@ui-kitten/components";
import produce from "immer";

import { useSafeArea, SafeAreaView } from "react-native-safe-area-context";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const renderItemIcon = (props) => <Icon {...props} name="person" />;

const renderItem = ({ item, index }) => (
  <ListItem
    key={item["name"]}
    title={item["name"]}
    description={`${item["number"]}번`}
    accessoryLeft={renderItemIcon}
  />
);

const styles = {
  safeview: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: "flex-start",
  },
};

export const ClassGroupScreen = ({ navigation, route }: Object) => {
  const { grade, className, members } = route.params;
  console.log(members);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeview}>
      <TopNavigation
        title={`${grade} ${className}`}
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        <List data={members} renderItem={renderItem} />
      </Layout>
    </SafeAreaView>
  );
};
