import React from "react";
import { Div, DivProps } from "react-native-magnus";

import { useTheme } from "../hooks";

interface Props extends DivProps {
  children: React.ReactNode;
}

const Background: React.FC<Props> = ({ children, ...other }) => {
  const { colors } = useTheme();

  return (
    <Div flex={1} bg={colors.background} {...other}>
      {children}
    </Div>
  );
};

export default Background;
