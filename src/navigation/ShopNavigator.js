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
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../styles/colors";

const AppStack = createStackNavigator();
const ProductsStack = createStackNavigator();
const OrdersStack = createStackNavigator();
const AdminStack = createStackNavigator();
const AuthStack = createStackNavigator();
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
    <ProductsStack.Navigator
      screenOptions={defaultScreenOptions}
      initialRouteName="ProductsOverview"
    >
      <ProductsStack.Screen
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
                  navigation.navigate("Cart");
                }}
              ></Item>
            </HeaderButtons>
          ),
        })}
      />
      <ProductsStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={({ routes, navigation }) => ({
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              ></Item>
            </HeaderButtons>
          ),
        })}
      />
      <ProductsStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Cart",
        }}
      />
    </ProductsStack.Navigator>
  );
};

const OrdersStackNavigator = () => {
  return (
    <OrdersStack.Navigator screenOptions={defaultScreenOptions}>
      <OrdersStack.Screen
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
    </OrdersStack.Navigator>
  );
};

const AdminStackNavigator = () => {
  return (
    <AdminStack.Navigator screenOptions={defaultScreenOptions}>
      <AdminStack.Screen
        name="UserProducts"
        component={UserProductScreen}
        options={({ routes, navigation }) => ({
          title: "User Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
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
                title="Create"
                iconName={
                  Platform.OS === "android" ? "md-create" : "ios-create"
                }
                onPress={() => {
                  navigation.navigate("EditProduct");
                }}
              ></Item>
            </HeaderButtons>
          ),
        })}
      />
      <AdminStack.Screen name="EditProduct" component={EditProductScreen} />
    </AdminStack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={defaultScreenOptions}
      initialRouteName="Products"
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

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={defaultScreenOptions}>
      <AuthStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          title: "Login",
        }}
      />
    </AuthStack.Navigator>
  );
};

const AppNavigator = ({ userToken = true }) => {
  return (
    <AppStack.Navigator
      screenOptions={defaultScreenOptions}
      headerMode="none"
      initialRouteName="SignUp"
    >
      {userToken ? (
        <AppStack.Screen name="App" component={DrawerNavigator} />
      ) : (
        // <AppStack.Screen name="SignUp" component={AuthNavigator} />
        <AppStack.Screen name="StartupScreen" component={StartupScreen} />
      )}
    </AppStack.Navigator>
  );
};

export default AppNavigator;
