import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { ConsumeItem } from "../atoms";
import { Button, Icon } from "../common";
import { useTheme } from "../hooks";
import {
  Home,
  RecordEntry,
  FoodItems,
  AddItem,
  FoodHistory,
  FoodItemsOptions,
} from "../screens";

export type RootStackParamList = {
  Home: undefined;
  RecordEntry:
    | {
        item: ConsumeItem;
        editItemName?: string;
        isLastItem: boolean;
      }
    | undefined;
  FoodItems: undefined;
  AddItem: undefined;
  FoodHistory:
    | {
        itemId: string;
      }
    | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { colors } = useTheme();
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        <RootStack.Screen
          name="Home"
          component={Home}
          options={({ navigation: { navigate } }) => ({
            title: "",
            headerTitleAlign: "left",
            headerRight: () => (
              <Button
                onPress={() => navigate("FoodHistory")}
                title="Diet History"
                mode="text"
                suffix={
                  <Icon name="right" color={colors.primary} pl="md" mt={4} />
                }
              />
            ),
          })}
        />
        <RootStack.Screen
          name="RecordEntry"
          component={RecordEntry}
          options={{
            headerShown: true,
            title: "Record Item",
          }}
        />
        <RootStack.Screen
          name="FoodItems"
          component={FoodItems}
          options={FoodItemsOptions}
        />
        <RootStack.Screen
          name="AddItem"
          component={AddItem}
          options={{
            headerShown: true,
            title: "Add New Item",
          }}
        />
        <RootStack.Screen
          name="FoodHistory"
          component={FoodHistory}
          options={{
            headerShown: true,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
