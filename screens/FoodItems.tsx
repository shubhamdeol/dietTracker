import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { NoFoodItems } from "../assets";
import { rFoodItems, rSelectedItem, FoodItem } from "../atoms";
import { AnimateScale, Background, Div, Icon, Text, Image } from "../common";
import { RootStackParamList } from "../navigation/RootNavigator";

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
  },
});

const Item: React.FC<{
  item: FoodItem;
}> = ({ item: { name, id, quantityType } }) => {
  const { goBack } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const selectItem = useSetRecoilState(rSelectedItem);
  const pickItem = () => {
    selectItem({
      name,
      id,
      quantityType,
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

const renderEmpty = () => (
  <Div flex={1} justifyContent="center" alignItems="center">
    <Image
      resizeMode="contain"
      source={NoFoodItems}
      h={250}
      w={250}
      mb={10}
      rounded="circle"
    />
    <Text fontFamily="RobotoMedium" fontSize="2xl">
      Add your first food item
    </Text>
  </Div>
);

const FoodItems: React.FC<Props> = () => {
  const foodItems = useRecoilValue(rFoodItems);
  return (
    <Background px="xl" pt="md">
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={foodItems}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <Item item={item} />}
        ListEmptyComponent={renderEmpty}
      />
    </Background>
  );
};

export default FoodItems;

export const FoodItemsOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, "FoodItems">;
      navigation: any;
    }) => StackNavigationOptions)
  | undefined = ({ navigation: { navigate } }) => {
  return {
    headerShown: true,
    title: "Food Items",
    headerRight: () => (
      <AnimateScale shouldAnimateInLoop scaleTo={1.3}>
        <TouchableOpacity onPress={() => navigate("AddItem")}>
          <Icon name="plus" pr="lg" fontSize="4xl" />
        </TouchableOpacity>
      </AnimateScale>
    ),
  };
};
