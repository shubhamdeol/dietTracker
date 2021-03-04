import React from "react";

import { RatingType } from "../constants";
import Div from "./Div";
import Text from "./Text";

export const getRatingColors = (rating: RatingType) => {
  switch (rating.value) {
    case 0:
      return "#c53030";
    case 1:
      return "#feb2b2";
    case 2:
      return "#d69e2e";
    case 3:
      return "#c6f6d5";
    case 4:
      return "#48bb78";
    default:
      return "#48bb78";
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
        {rating?.label}
      </Text>
    </Div>
  );
};

export default ShowRating;
