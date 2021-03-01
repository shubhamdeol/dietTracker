import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";

import { Icon } from "../common";
import { useTheme } from "../hooks";
import { Home, RecordEntry, FoodItems, AddItem } from "../screens";

export type RootStackParamList = {
  Home: undefined;
  RecordEntry: undefined;
  FoodItems: undefined;
  AddItem: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { colors } = useTheme();
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      >
        <RootStack.Screen name="Home" component={Home} />
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
          options={({ navigation: { navigate } }) => ({
            headerShown: true,
            title: "Food Items",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigate("AddItem")}>
                <Icon
                  name="plus"
                  color={colors.primary}
                  pr="lg"
                  fontSize="4xl"
                />
              </TouchableOpacity>
            ),
          })}
        />
        <RootStack.Screen
          name="AddItem"
          component={AddItem}
          options={{
            headerShown: true,
            title: "Add New Item",
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
