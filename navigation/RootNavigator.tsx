import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { ConsumeItem } from "../atoms";
import { Icon } from "../common";
import { useTheme } from "../hooks";
import {
  Home,
  RecordEntry,
  FoodItems,
  AddItem,
  FoodHistory,
  FoodItemsOptions,
  ProductList,
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

export type ProductsStackParamList = {
  ProductList: undefined;
  AddProduct:
    | {
        itemId: string;
      }
    | undefined;
};

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator<RootStackParamList>();

const ProductsStack = createStackNavigator<ProductsStackParamList>();

const Products = () => {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen
        options={{
          headerShown: false,
        }}
        name="ProductList"
        component={ProductList}
      />
      <ProductsStack.Screen
        name="AddProduct"
        component={AddItem}
        options={{}}
      />
    </ProductsStack.Navigator>
  );
};

const HomeTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              fontFamily="MaterialIcons"
              name="home"
              fontSize={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              fontFamily="MaterialIcons"
              name="format-list-numbered"
              fontSize={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Help"
        component={ProductList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              fontFamily="MaterialIcons"
              name="help"
              fontSize={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <HomeStack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        <HomeStack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
        <HomeStack.Screen
          name="RecordEntry"
          component={RecordEntry}
          options={{
            headerShown: true,
            title: "Record Item",
          }}
        />
        <HomeStack.Screen
          name="FoodItems"
          component={FoodItems}
          options={FoodItemsOptions}
        />
        <HomeStack.Screen
          name="AddItem"
          component={AddItem}
          options={{
            headerShown: true,
            title: "Add New Item",
          }}
        />
        <HomeStack.Screen
          name="FoodHistory"
          component={FoodHistory}
          options={{
            headerShown: true,
          }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
