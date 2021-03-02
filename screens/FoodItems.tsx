import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { rFoodItems, rSelectedItem, FoodItem } from "../atoms";
import { Background, Div, Text } from "../common";
import { RootStackParamList } from "../navigation/RootNavigator";

const Item: React.FC<{
  item: FoodItem;
}> = ({ item: { name, id } }) => {
  const { goBack } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const selectItem = useSetRecoilState(rSelectedItem);
  const pickItem = () => {
    selectItem({
      name,
      id,
    });
    goBack();
  };

  return (
    <TouchableOpacity onPress={pickItem}>
      <Div bg="blue100" px="xl" py="md" mr="md" mt="md" rounded="circle">
        <Text color="gray800">{name}</Text>
      </Div>
    </TouchableOpacity>
  );
};

interface Props {}

const FoodItems: React.FC<Props> = () => {
  const foodItems = useRecoilValue(rFoodItems);
  return (
    <Background px="xl" pt="md">
      <FlatList
        contentContainerStyle={{
          justifyContent: "flex-start",
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        data={foodItems}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <Item item={item} />}
        ListEmptyComponent={<Text>Add New Food Item</Text>}
      />
    </Background>
  );
};

export default FoodItems;
