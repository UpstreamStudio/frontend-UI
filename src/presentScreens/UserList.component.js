// @flow
import React from "react";
import { ULDrawers } from "../components/ULDrawer.component";
import ULDrawersContainer from "../containerScreens/DrawerContainer";
import { ULTopNav } from "../components/ULTopNav.component";
import { Layout, useTheme } from "@ui-kitten/components";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ULScreen = (props: Object) => {
  React.useEffect(() => {
    console.log("ulscreenrerendered!");
  });
  console.log("mounted!");
  const { navigation } = props;
  return (
    <SafeAreaView style={style.safeview} edges={["top", "right", "left"]}>
      <Layout style={style.layout} level="1">
        <View>
          <ULTopNav />
        </View>
        <View>
          <ULDrawersContainer navigation={navigation} />
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const style = {
  layout: {
    flex: 1,
    justifyContent: "flex-start",
  },
  safeview: {
    flex: 1,
  },
};
