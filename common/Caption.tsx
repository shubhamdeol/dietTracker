import React from "react";
import { Text as MgText, TextProps } from "react-native-magnus";

import { useTheme } from "../hooks";

interface Props extends TextProps {
  fontFamily?: "RobotoRegular" | "RobotoMedium" | "RobotoBold";
}

const Caption: React.FC<Props> = ({
  fontFamily = "RobotoRegular",
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <MgText
      fontSize="sm"
      color={colors.caption}
      fontFamily={fontFamily}
      {...props}
    />
  );
};

export default Caption;
