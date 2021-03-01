import React from "react";
import { useRecoilState } from "recoil";

import { Background, Input, Button, SnackbarRef } from "../common";
import { useTheme } from "../hooks";
import { rFoodItems } from "../store";

const AddItem: React.FC = () => {
  const [itemName, setItemName] = React.useState("");
  const [foodItems, setFoodItems] = useRecoilState(rFoodItems);
  const { colors } = useTheme();
  const snackbarRef = React.useRef<SnackbarRef>(null);

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
          id: "test",
        },
      ]);
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
