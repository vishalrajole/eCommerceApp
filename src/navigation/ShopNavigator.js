import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../styles/colors";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
};

const ProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({ routes, navigation }) => ({
          title: "Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              ></Item>
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => {
                  navigation.navigate("CartScreen");
                }}
              ></Item>
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={({ routes, navigation }) => ({
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => {
                  navigation.navigate("CartScreen");
                }}
              ></Item>
            </HeaderButtons>
          ),
        })}
      />

      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: "Cart",
        }}
      />
    </Stack.Navigator>
  );
};
const OrdersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ routes, navigation }) => ({
          title: "Orders",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              ></Item>
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Your Products"
        component={UserProductScreen}
        options={({ routes, navigation }) => ({
          title: "Your Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              ></Item>
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Products" component={ProductsNavigator} />
//       <Tab.Screen name="Orders" component={OrdersStackNavigator} />
//     </Tab.Navigator>
//   );
// };

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={defaultScreenOptions}
      drawerStyle={{
        backgroundColor: "white",
        width: 240,
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (drawerConfig) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={drawerConfig.tintColor}
              ></Ionicons>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersStackNavigator}
        options={{
          drawerIcon: (drawerConfig) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={drawerConfig.tintColor}
              ></Ionicons>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminStackNavigator}
        options={{
          drawerIcon: (drawerConfig) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={drawerConfig.tintColor}
              ></Ionicons>
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
