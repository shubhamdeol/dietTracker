import React from "react";
import { Text as MgText, TextProps } from "react-native-magnus";

interface Props extends TextProps {
  fontFamily?: "RobotoRegular" | "RobotoMedium" | "RobotoBold";
}

const Text: React.FC<Props> = ({ fontFamily = "RobotoRegular", ...props }) => {
  return <MgText fontFamily={fontFamily} {...props} />;
};

export default Text;
