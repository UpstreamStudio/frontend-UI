import React from "react";
import { SafeAreaView, View, Platform } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { useSafeArea } from "react-native-safe-area-context";

export const HomeScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate("Details");
  };

  const inset = useSafeArea();

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: Platform.os === "android" ? inset.top : 0 }}
    >
      <TopNavigation title="MyApp" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button onPress={navigateDetails}>OPEN DETAILS</Button>
      </Layout>
    </SafeAreaView>
  );
};
