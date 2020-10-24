import React from "react";
import { SafeAreaView, View, Platform } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { useSafeArea } from "react-native-safe-area-context";
import { ThemeContext } from "../theme-context";

export const HomeScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate("Details");
  };

  const inset = useSafeArea();

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: Platform.OS === "android" ? inset.top : 0 }}
    >
      <TopNavigation title="MyApp" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button style={{ marginVertical: 4 }} onPress={navigateDetails}>
          OPEN DETAILS
        </Button>
        <Button
          style={{ marginVertical: 4 }}
          // onPress={themeContext.toggleTheme}
        >
          TOGGLE THEME
        </Button>
      </Layout>
    </SafeAreaView>
  );
};
