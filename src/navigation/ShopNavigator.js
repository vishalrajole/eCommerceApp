import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import colors from "../styles/colors";

const Stack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform === "android" ? colors.primary : "",
        },
        headerTintColor: Platform === "android" ? "white" : colors.primary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
        },
        headerBackTitleStyle: {
          fontFamily: "open-sans",
        },
      }}
    >
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={{
          headerShown: true,
          title: "All Products",
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
export default ProductsNavigator;
