//      
import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Input, Icon } from "@ui-kitten/components";

const style = {
  input: {
    marginVertical: 8,
  },
};
// Id input
const PersonIcon = (props        ) => {
  return <Icon {...props} name="person" />;
};

export const IdInput = (props        )      => {
  const [value, setValue] = useState("");
  return (
    <Input
      style={style.input}
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
      style={style.input}
      value={value}
      placeholder="Password"
      accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
      onChangeText={(nextValue) => setValue(nextValue)}
    />
  );
};
