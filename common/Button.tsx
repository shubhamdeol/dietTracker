import React from "react";
import { Button as MagnusButton, ButtonProps } from "react-native-magnus";

import { useTheme } from "../hooks";

interface Props extends ButtonProps {
  mode?: "primary" | "outlined" | "text";
  title: string;
}

const Button: React.FC<Props> = ({ title, mode, ...other }) => {
  const { colors } = useTheme();

  switch (mode) {
    case "outlined":
      return (
        <MagnusButton
          px="xl"
          bg={colors.background}
          rounded="circle"
          borderWidth={1}
          borderColor={colors.border}
          color={colors.primary}
          shadow={2}
          alignSelf="center"
          {...other}
        >
          {title}
        </MagnusButton>
      );

    default:
      return (
        <MagnusButton
          px="xl"
          bg={colors.primary}
          rounded="circle"
          shadow={2}
          alignSelf="center"
          {...other}
        >
          {title}
        </MagnusButton>
      );
  }
};

export default Button;
