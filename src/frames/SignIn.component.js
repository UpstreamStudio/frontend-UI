// @flow
import React from "react";
import { SafeAreaView, View, Platform } from "react-native";
import { TextButton } from "../components/TextButton.component";
import { LoginHero } from "../components/LoginHero.component";
import { IdInput, PassInput } from "../components/LoginInputs.component";
import { Layout, useTheme } from "@ui-kitten/components";
import { useSafeArea } from "react-native-safe-area-context";

type State = {
  isLoading: boolean,
};

const styles = {
  safeview: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  hero: {
    flex: 1,
  },
  nothero: {
    flex: 3,
    padding: 10,
    paddingTop: 20,
  },
  inputView: {
    flex: 2,
    justifyContent: "start",
  },
  buttonView: {
    flex: 1,
    justifyContent: "center",
  },
};

export const SignInFrame = (props: Object) => {
  const inset = useSafeArea();
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        ...styles.safeview,
        paddingTop: Platform.OS === "android" ? inset.top : 0,
      }}
    >
      <Layout style={styles.container} level="1">
        <View
          style={{
            ...styles.hero,
            backgroundColor: theme["color-primary-600"],
          }}
        >
          <LoginHero />
        </View>
        <View style={styles.nothero}>
          <View
            style={{
              ...styles.inputView,
            }}
          >
            <IdInput />
            <PassInput />
          </View>
          <View
            style={{
              ...styles.buttonView,
            }}
          >
            <TextButton text="SIGN IN" size="large" />
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};
