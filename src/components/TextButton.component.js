// @flow
import React from "react";
import { Button } from "@ui-kitten/components";

export const TextButton = (props: Object): any => {
  const { text, appearance, status, size, ...others } = props;
  return (
    <Button appearance={appearance} status={status} size={size}>
      {text}
    </Button>
  );
};
