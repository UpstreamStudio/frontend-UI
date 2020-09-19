// @flow
import React from "react";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";

const style = {
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    margin: 4,
    color: "#fff",
  },
};

export const LoginHero = (props: Object): any => {
  return (
    <View style={style.view}>
      <Text style={style.text} category="h1">
        Hello
      </Text>

      <Text style={style.text} category="h5">
        Sign in to your account
      </Text>
    </View>
  );
};
