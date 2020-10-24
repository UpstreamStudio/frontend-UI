//      
import React from "react";
import { ULDrawers } from "../../components/ULDrawer.component";
import ULDrawersContainer from "../../containerScreens/DrawerContainer";
import { ULTopNav } from "../../components/ULTopNav.component";
import { Layout, useTheme } from "@ui-kitten/components";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ULScreen = (props        ) => {
  React.useEffect(() => {
    console.log("ulscreenrerendered!");
  });
  console.log("mounted!");

  const theme = useTheme();

  const { navigation } = props;
  return (
    <Layout level="2" style={styles.background}>
      <SafeAreaView style={styles.safeview} edges={["top", "right", "left"]}>
        <StatusBar backgroundColor={theme["color-primary-600"]} />
        <View style={styles.layout}>
          <View>
            <ULTopNav />
          </View>
          <View>
            <ULDrawersContainer navigation={navigation} />
          </View>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const styles = {
  background: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: "flex-start",
  },
  safeview: {
    flex: 1,
  },
};
