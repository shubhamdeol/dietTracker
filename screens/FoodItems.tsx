import React from "react";
import { FlatList } from "react-native";
import { useRecoilValue } from "recoil";

import { Background, Div, Text } from "../common";
import { rFoodItems } from "../store";

const Item = ({ item: { name } }) => {
  return (
    <Div
      bg={false ? "blue600" : "blue100"}
      px="xl"
      py="md"
      mr="md"
      rounded="circle"
    >
      <Text color={false ? "white" : "gray800"}>{name}</Text>
    </Div>
  );
};

const FoodItems = () => {
  const foodItems = useRecoilValue(rFoodItems);
  return (
    <Background>
      <FlatList
        data={foodItems}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <Item item={item} />}
        ListFooterComponent={<Text>Add New Food Item</Text>}
      />
    </Background>
  );
};

export default FoodItems;
