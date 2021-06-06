import React from "react";
import { Button as MagnusButton, ButtonProps } from "react-native-magnus";

import { useTheme } from "../hooks";

interface Props extends ButtonProps {
  mode?: "primary" | "outlined" | "text";
  title: string;
  fontFamily?: "RobotoRegular" | "RobotoMedium" | "RobotoBold";
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
          h={50}
          alignSelf="center"
          {...other}
        >
          {title}
        </MagnusButton>
      );
    case "text":
      return (
        <MagnusButton
          px="xl"
          bg="#fff"
          rounded="circle"
          color={colors.primary}
          shadow={2}
          h={40}
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
          h={50}
          alignSelf="center"
          fontFamily="RobotoMedium"
          fontSize="xl"
          {...other}
        >
          {title}
        </MagnusButton>
      );
  }
};

export default Button;
