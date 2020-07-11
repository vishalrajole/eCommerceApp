import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverviewScreen from "../screens/shop/ProductOverviewScreen";
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
    </Stack.Navigator>
  );
};
export default ProductsNavigator;
