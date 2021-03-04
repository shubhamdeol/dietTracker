import { selector } from "recoil";

import { FoodItem, rConsumeHistory, rFoodItems } from ".";
import { RatingType } from "../constants";

type DietItem = Pick<FoodItem, "id" | "name"> & {
  rating: RatingType;
};

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

export const rDietResults = selector({
  key: "dietResults",
  get: ({ get }) => {
    const foodItems = get(rFoodItems);
    const consumeHistory = get(rConsumeHistory);

    const dietResults = foodItems.reduce<DietItem[]>((acc, cv) => {
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
      }

      return acc;
    }, []);

    return dietResults;
  },
});
