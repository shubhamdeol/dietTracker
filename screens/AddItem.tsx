import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useRecoilState } from "recoil";

import { rFoodItems } from "../atoms";
import { Background, Input, Button, Radio, Div, Text } from "../common";
import { useTheme } from "../hooks";
import { RootStackParamList } from "../navigation/RootNavigator";

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
  navigation: StackNavigationProp<RootStackParamList>;
}

const quantityTypes = [
  {
    type: "Plate",
    id: 1,
  },
  {
    type: "Bowl",
    id: 2,
  },
  {
    type: "Number",
    id: 3,
  },
  {
    type: "Gram",
    id: 4,
  },
] as const;

type ElementType<
  T extends readonly unknown[]
> = T extends readonly (infer ElementType)[] ? ElementType : never;

export type QuantityType = ElementType<typeof quantityTypes>;

const AddItem: React.FC<Props> = ({ navigation: { goBack } }) => {
  const [itemName, setItemName] = React.useState("");
  const [foodItems, setFoodItems] = useRecoilState(rFoodItems);
  const [quantityType, setQuantityType] = React.useState<QuantityType | null>(
    null
  );
  const { colors } = useTheme();

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

  return (
    <Background p="xl">
      <Input
        placeholder="Ex: Rice with curd"
        autoFocus
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
        title="Add Item"
        block
        mt="2xl"
        onPress={addItem}
      />
    </Background>
  );
};

export default AddItem;
