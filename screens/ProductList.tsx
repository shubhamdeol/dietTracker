import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, StyleSheet, Pressable } from "react-native";
import { useRecoilValue } from "recoil";
import { ValuesType } from "utility-types";

import { NoFoodItems } from "../assets";
import { rFoodItems } from "../atoms/index";
import { Background, Caption, Div, Text, Divider, Fab, Image } from "../common";
import { useTheme } from "../hooks";
import { ProductsStackParamList } from "../navigation/RootNavigator";

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 80,
    flexGrow: 1,
  },
});

type Props = {
  navigation: StackNavigationProp<ProductsStackParamList, "ProductList">;
};

const ProductList: React.FC<Props> = ({
  navigation: { navigate, setOptions },
}) => {
  const foodItems = useRecoilValue(rFoodItems);
  const { colors } = useTheme();

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

  const renderItem = React.useCallback(
    ({ item }: { item: ValuesType<typeof foodItems> }) => {
      return (
        <Pressable
          onPress={() => {
            navigate("AddProduct", {
              itemId: item.id,
            });
          }}
        >
          <Div mb="md" p="md">
            <Div>
              <Text fontFamily="RobotoMedium">{item.name}</Text>
              <Caption my="sm">Measured In: {item.quantityType.type}</Caption>
            </Div>
            <Divider mt="sm" />
          </Div>
        </Pressable>
      );
    },
    []
  );

  return (
    <Background>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={foodItems}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
      />
      <Fab
        bg={colors.primary}
        color="#fff"
        animated={false}
        onPress={() => {
          navigate("AddProduct");
        }}
      />
    </Background>
  );
};

export default ProductList;
