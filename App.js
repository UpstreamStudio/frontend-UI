import "react-native-gesture-handler";
import React from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
  Icon,
} from "@ui-kitten/components";
import { default as theme } from "./theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./components/navigation.component";
import { SafeAreaProvider } from "react-native-safe-area-context";

// const style = {
//   flex: 1,
//   justifyContent: "center",
//   alignItems: "center",
//   backgroundColor: theme["color-primary-600"],
// };

// const HomeScreen = (props) => (
//   <Layout style={style}>
//     <Text category="h1">Main</Text>
//     <LoginButton />
//   </Layout>
// );

export default () => (
  <React.Fragment>
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <AppNavigator />
      </ApplicationProvider>
    </SafeAreaProvider>
  </React.Fragment>
);
