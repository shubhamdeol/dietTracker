import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector } from "recoil";

import { RatingType } from "../constants";

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

export type FoodItem = {
  name: string;
  id: string;
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

export type SelectedItem = Pick<FoodItem, "id" | "name">;

export const rSelectedItem = atom<SelectedItem | null>({
  key: "selectedItem",
  default: null,
});

type ConsumeItem = {
  date: Date;
  rating: RatingType;
  item: SelectedItem;
  id: string;
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

const getAverageRating = (allRatings: number[]): RatingType => {
  const getLabel = (
    value: number
  ): "Severe" | "Bad" | "Okay" | "Good" | "Excellent" => {
    switch (value) {
      case 0:
        return "Severe";
      case 1:
        return "Bad";
      case 2:
        return "Okay";
      case 3:
        return "Good";
      case 4:
        return "Excellent";
      default:
        return "Excellent";
    }
  };
  const total = allRatings.reduce((acc, cv) => {
    acc += cv;
    return acc;
  }, 0);
  const average = total / allRatings.length;
  return {
    value: Math.round(average) as 0 | 1 | 2 | 3 | 4,
    label: getLabel(Math.round(average)),
  };
};

type DietItem = Pick<FoodItem, "id" | "name"> & {
  rating: RatingType;
};

export const rDietResults = selector({
  key: "dietResults",
  get: ({ get }) => {
    const foodItems = get(rFoodItems);
    const consumeHistory = get(rConsumeHistory);
    const dietResults: DietItem[] = foodItems.reduce((acc, cv) => {
      const item = consumeHistory.find((consumedItem) => {
        if (consumedItem.item.id === cv.id) {
          return true;
        }
      });
      if (item) {
        const allTimeRatings = consumeHistory
          .filter((item) => item.item.id === cv.id)
          .map((each) => each.rating.value);

        const dietItem = {
          ...cv,
          rating: getAverageRating(allTimeRatings),
        };
        acc.push(dietItem);
        return acc;
      }

      return [];
    }, []);
    return dietResults;
  },
});
