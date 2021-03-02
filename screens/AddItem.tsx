import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useRecoilState } from "recoil";

import { rFoodItems } from "../atoms";
import { Background, Input, Button } from "../common";
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

const AddItem: React.FC<Props> = ({ navigation: { goBack } }) => {
  const [itemName, setItemName] = React.useState("");
  const [foodItems, setFoodItems] = useRecoilState(rFoodItems);
  const { colors } = useTheme();

  const addItem = () => {
    const isAlreadyPresent =
      foodItems.findIndex(
        (item) => item.name.toLowerCase() === itemName.toLowerCase()
      ) !== -1;
    if (!isAlreadyPresent) {
      setFoodItems([
        ...foodItems,
        {
          name: itemName,
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
      <Button
        disabled={!itemName.trim()}
        title="Add Item"
        block
        mt="2xl"
        onPress={addItem}
      />
    </Background>
  );
};

export default AddItem;
