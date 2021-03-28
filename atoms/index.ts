import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "recoil";

import { RatingType } from "../constants";
import { QuantityType } from "../screens/AddItem";

// atoms are names with prefix "r" which stands for recoil
// example: theme will be named to rTheme

const themeObject = {
  isDark: false,
  colors: {
    primary: "#fd7e14",
    secondary: "blue600",
    background: "#fff",
    border: "gray400",
    caption: "gray600",
  },
};

export const rTheme = atom({
  key: "theme",
  default: themeObject,
});

export type FoodItem = {
  name: string;
  id: string;
  quantityType: QuantityType;
};

export const rFoodItems = atom<FoodItem[]>({
  key: "foodItems",
  default: [],
  effects_UNSTABLE: [
    ({ onSet, node }) => {
      onSet((newValue) => {
        AsyncStorage.setItem(node.key, JSON.stringify(newValue));
      });
    },
  ],
});

export type SelectedItem = Pick<FoodItem, "id" | "name" | "quantityType">;

export const rSelectedItem = atom<SelectedItem | null>({
  key: "selectedItem",
  default: null,
});

export type ConsumeItem = {
  date: Date;
  rating: RatingType;
  item: SelectedItem;
  id: string;
  quantity: number;
};

export const rConsumeHistory = atom<ConsumeItem[]>({
  key: "consumeHistory",
  default: [],
  effects_UNSTABLE: [
    ({ onSet, node }) => {
      onSet((newValue) => {
        AsyncStorage.setItem(node.key, JSON.stringify(newValue));
      });
    },
  ],
});
