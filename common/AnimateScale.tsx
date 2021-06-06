import { MotiView } from "moti";
import React from "react";

interface Props {
  shouldAnimateInLoop: boolean;
  scaleTo?: number;
}

const AnimateScale: React.FC<Props> = ({
  children,
  shouldAnimateInLoop,
  scaleTo,
}) => {
  return (
    <MotiView
      from={{
        scale: 1,
      }}
      animate={{
        scale: scaleTo || 1.05,
      }}
      transition={{
        loop: shouldAnimateInLoop,
        type: "timing",
        duration: 400,
        delay: 100,
      }}
    >
      {children}
    </MotiView>
  );
};

export default AnimateScale;
