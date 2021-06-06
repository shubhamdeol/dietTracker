import React from "react";
import { Icon as MgIcon, IconProps } from "react-native-magnus";

import { useTheme } from "../hooks";

interface Props extends IconProps {}

const Icon: React.FC<Props> = ({ color, ...other }) => {
  const { colors } = useTheme();
  return <MgIcon color={color || colors.primary} {...other} />;
};

export default Icon;
