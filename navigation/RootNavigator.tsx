import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Home } from "../screens";

const Root = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Root.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Root.Screen name="Home" component={Home} />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
