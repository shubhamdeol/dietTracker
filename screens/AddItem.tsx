import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { TextInput } from "react-native";
import { useRecoilState } from "recoil";

import { rFoodItems } from "../atoms";
import { Background, Input, Button, Radio, Div, Text } from "../common";
import { useTheme } from "../hooks";
import { ProductsStackParamList } from "../navigation/RootNavigator";

export const createRandomId = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let autoId = "";
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
};

interface Props {
  navigation: StackNavigationProp<ProductsStackParamList, "AddProduct">;
  route: RouteProp<ProductsStackParamList, "AddProduct">;
}

const quantityTypes = [
  {
    id: 1,
    type: "Plate",
    possibleQuantities: [1, 2],
    defaultQuantity: 1,
  },
  {
    id: 2,
    type: "Bowl",
    possibleQuantities: [1, 2],
    defaultQuantity: 1,
  },
  {
    id: 3,
    type: "Number",
    possibleQuantities: [1, 2, 3, 4],
    defaultQuantity: 1,
  },
  {
    id: 4,
    type: "Gram",
    possibleQuantities: [10, 20, 50, 100, 200, 400],
    defaultQuantity: 10,
  },
  {
    id: 5,
    type: "ml",
    possibleQuantities: [10, 20, 50, 100, 200, 400, 500],
    defaultQuantity: 100,
  },
  {
    id: 6,
    type: "Cup",
    possibleQuantities: [1, 2, 3, 4],
    defaultQuantity: 1,
  },
  {
    id: 7,
    type: "teaspoon",
    possibleQuantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    defaultQuantity: 1,
  },
] as const;

type ElementType<
  T extends readonly unknown[]
> = T extends readonly (infer ElementType)[] ? ElementType : never;

export type QuantityType = ElementType<typeof quantityTypes>;

const AddItem: React.FC<Props> = ({
  navigation: { goBack, setOptions },
  route: { params },
}) => {
  const [itemName, setItemName] = React.useState("");
  const inputRef = React.useRef<TextInput | null>(null);
  const [foodItems, setFoodItems] = useRecoilState(rFoodItems);
  const [quantityType, setQuantityType] = React.useState<QuantityType | null>(
    null
  );
  const { colors } = useTheme();
  const isEditing = params?.itemId;

  useEffect(() => {
    const editItem = foodItems.find((item) => item.id === params?.itemId);
    if (editItem) {
      setItemName(editItem.name);
      setQuantityType(editItem.quantityType);
      setOptions({
        title: "Update Item",
      });
    }
    inputRef?.current?.focus();
  }, [params, setOptions, foodItems]);

  const addItem = () => {
    const isAlreadyPresent =
      foodItems.findIndex(
        (item) => item.name.toLowerCase() === itemName.toLowerCase()
      ) !== -1;
    if (!isAlreadyPresent && quantityType) {
      setFoodItems([
        ...foodItems,
        {
          name: itemName,
          quantityType,
          id: createRandomId(),
        },
      ]);
      goBack();
    } else {
      alert("already present");
    }
  };

  const updateItem = () => {
    const updatedItems = foodItems.map((foodItem) => {
      if (foodItem.id === params?.itemId) {
        return {
          ...foodItem,
          name: itemName,
          quantityType: quantityType as QuantityType,
        };
      }
      return foodItem;
    });
    setFoodItems(updatedItems);
    goBack();
  };

  return (
    <Background p="xl">
      <Input
        placeholder="Ex: Rice with curd"
        maxLength={50}
        defaultValue={itemName}
        autoFocus
        ref={inputRef}
        focusBorderColor={colors.secondary}
        onChangeText={(text) => setItemName(text)}
      />
      <Div>
        <Text my="xl" fontSize="md" fontWeight="bold" color="gray500">
          Measured In
        </Text>
        {!!itemName?.trim() && (
          <Div row flexWrap="wrap">
            {quantityTypes.map((item) => (
              <Radio
                value={item}
                key={item.id}
                onChange={(val) => setQuantityType(val)}
              >
                {({ checked }) => (
                  <Div
                    bg={
                      quantityType?.type === item.type ? "blue600" : "blue100"
                    }
                    px="xl"
                    py="md"
                    mr="md"
                    mb="lg"
                    rounded="circle"
                  >
                    <Text
                      color={
                        quantityType?.type === item.type ? "white" : "gray800"
                      }
                    >
                      {item.type}
                    </Text>
                  </Div>
                )}
              </Radio>
            ))}
          </Div>
        )}
      </Div>
      <Button
        disabled={!itemName.trim() || !quantityType?.type}
        title={isEditing ? "Update Item" : "Add Item"}
        block
        mt="2xl"
        onPress={isEditing ? updateItem : addItem}
      />
    </Background>
  );
};

export default AddItem;
