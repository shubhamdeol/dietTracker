import { useRecoilValue } from "recoil";

import { rTheme } from "../atoms/index";

export const useTheme = () => {
  const { colors, isDark } = useRecoilValue(rTheme);
  return {
    colors,
    isDark,
  };
};
