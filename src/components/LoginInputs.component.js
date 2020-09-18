// @flow
import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Input, Icon } from "@ui-kitten/components";

// Id input
const PersonIcon = (props: Object) => {
  return <Icon {...props} name="person-outline" />;
};

export const IdInput = (props: Object): any => {
  const [value, setValue] = useState("");
  return (
    <Input
      placeholder="ID"
      value={value}
      onChangeText={(nextValue) => setValue(nextValue)}
      accessoryRight={PersonIcon}
    />
  );
};

// password input
const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

export const PassInput = () => {
  const [value, setValue] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      value={value}
      placeholder="Password"
      caption="Should contain at least 8 symbols"
      accessoryRight={renderIcon}
      captionIcon={AlertIcon}
      secureTextEntry={secureTextEntry}
      onChangeText={(nextValue) => setValue(nextValue)}
    />
  );
};
