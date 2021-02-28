import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Home, RecordEntry } from "../screens";

export type RootStackParamList = {
  Home: undefined;
  RecordEntry: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
        mode="modal"
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
