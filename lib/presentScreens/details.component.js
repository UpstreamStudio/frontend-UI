import React from "react";
import { SafeAreaView, View, Platform } from "react-native";
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

import { useSafeArea } from "react-native-safe-area-context";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const DetailsScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const inset = useSafeArea();

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: Platform.OS === "android" ? inset.top : 0 }}
    >
      <TopNavigation
        title="MyApp"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">DETAILS</Text>
      </Layout>
    </SafeAreaView>
  );
};
