// @flow
import React from "react";
import { Button, Text } from "@ui-kitten/components";

const style = {
  text: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    height: 60,
  },
};
export const TextButton = (props: Object): any => {
  const { text, appearance, status, size, ...others } = props;
  return (
    <Button
      style={style.button}
      appearance={appearance}
      status={status}
      size={size}
    >
      <Text style={style.text}>{text}</Text>
    </Button>
  );
};
