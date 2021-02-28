import { useRecoilValue } from "recoil";

import { rTheme } from "../store/index";

export const useTheme = () => {
  const { colors, isDark } = useRecoilValue(rTheme);
  return {
    colors,
    isDark,
  };
};
