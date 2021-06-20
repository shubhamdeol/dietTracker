import React from "react";
import { StyleSheet } from "react-native";
import { DivProps, Div } from "react-native-magnus";

import { useTheme } from "../hooks";

interface Props extends DivProps {}

const Divider: React.FC<Props> = ({ ...props }) => {
  const { colors } = useTheme();
  return (
    <Div
      bg={colors.caption}
      h={StyleSheet.hairlineWidth}
      borderColor={colors.caption}
      {...props}
    />
  );
};

export default Divider;
