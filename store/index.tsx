import { atom } from "recoil";

// atoms are names with prefix "r" which stands for recoil
// example: theme will be named to rTheme

const themeObject = {
  isDark: false,
  colors: {
    primary: "#fd7e14",
    secondary: "blue600",
    background: "#fff",
    border: "gray400",
  },
};

export const rTheme = atom({
  key: "theme",
  default: themeObject,
});

type FoodItem = {
  name: string;
  id: string;
};

export const rFoodItems = atom<FoodItem[]>({
  key: "foodItems",
  default: [],
});
