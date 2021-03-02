import React from "react";

import { Div, Text } from ".";
import { RatingType } from "../constants";
import { useTheme } from "../hooks";

const getRatingColors = (rating: RatingType) => {
  switch (rating.value) {
    case 0:
      return "red700";
    case 1:
      return "red300";
    case 2:
      return "yellow600";
    case 3:
      return "purple500";
    case 4:
      return "green500";
    default:
      break;
  }
};

const ShowRating: React.FC<{
  rating: RatingType;
}> = ({ rating }) => {
  const ratingColor = getRatingColors(rating);
  return (
    <Div alignItems="center" justifyContent="center" w={80}>
      <Div mb="sm" h={14} w={14} bg={ratingColor} alignSelf="center" />
      <Text lineHeight={24} textAlign="center" color="gray500">
        {rating.label}
      </Text>
    </Div>
  );
};

export default ShowRating;
