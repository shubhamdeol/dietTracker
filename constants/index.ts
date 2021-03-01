export type RatingType = {
  value: 0 | 1 | 2 | 3 | 4;
  label: "Severe" | "Bad" | "Okay" | "Good" | "Excellent";
};

export const RATING_KINDS: RatingType[] = [
  {
    value: 0,
    label: "Severe",
  },
  {
    value: 1,
    label: "Bad",
  },
  {
    value: 2,
    label: "Okay",
  },
  {
    value: 3,
    label: "Good",
  },
  {
    value: 4,
    label: "Excellent",
  },
];
