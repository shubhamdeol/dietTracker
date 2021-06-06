import React from "react";
import { Text as MgText, TextProps } from "react-native-magnus";

interface Props extends TextProps {
  fontFamily?: "RobotoRegular" | "RobotoMedium" | "RobotoBold";
}

const Text: React.FC<Props> = ({ ...props }) => {
  return <MgText {...props} fontFamily="RobotoRegular" />;
};

export default Text;
