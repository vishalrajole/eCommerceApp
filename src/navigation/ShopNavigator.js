import React from "react";
import { Platform, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ProductsOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";

import NewPlaceScreen from "../screens/places/NewPlaceScreen";
import PlaceDetailsScreen from "../screens/places/PlaceDetailsScreen";
import PlacesListScreen from "../screens/places/PlacesListScreen";
import MapScreen from "../screens/places/MapScreen";

import CustomHeaderButton from "../components/HeaderButton";
import { logout } from "../store/actions/auth";
import Colors from "../styles/colors";
import { useDispatch } from "react-redux";

const ProductsStack = createStackNavigator();
const OrdersStack = createStackNavigator();
const AdminStack = createStackNavigator();
const AuthStack = createStackNavigator();
//const PlacesTabStack = createBottomTabNavigator();
const PlacesStack = createStackNavigator();
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

export const ProductsNavigator = () => {
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

export const OrdersStackNavigator = () => {
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

export const AdminStackNavigator = () => {
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

export const PlacesNavigator = () => {
  return (
    <PlacesStack.Navigator
      initialRouteName={"Places"}
      screenOptions={defaultScreenOptions}
    >
      <PlacesStack.Screen
        name="Places"
        component={PlacesListScreen}
        options={({ routes, navigation }) => ({
          title: "Places",
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
                  navigation.navigate("NewPlace");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <PlacesStack.Screen
        name="PlaceDetails"
        component={PlaceDetailsScreen}
        options={({ routes, navigation }) => ({
          title: "Place Details",
        })}
      />
      <PlacesStack.Screen
        name="NewPlace"
        component={NewPlaceScreen}
        options={({ routes, navigation }) => ({
          title: "New Place",
        })}
      />
      <PlacesStack.Screen
        name="Map"
        component={MapScreen}
        options={({ routes, navigation }) => ({
          title: "Map",
        })}
      />
    </PlacesStack.Navigator>
  );
};

export const DrawerNavigator = () => {
  const dispatch = useDispatch();

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
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <DrawerContentScrollView>
              <DrawerItemList {...props} />
              <View style={{ padding: 10 }}>
                <Button
                  title="Logout"
                  color={Colors.primary}
                  onPress={() => {
                    dispatch(logout());
                  }}
                />
              </View>
            </DrawerContentScrollView>
          </View>
        );
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
      <Drawer.Screen
        name="Places"
        component={PlacesNavigator}
        options={{
          drawerIcon: (drawerConfig) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-globe" : "ios-globe"}
                size={23}
                color={drawerConfig.tintColor}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export const AuthNavigator = () => {
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

// export const PlacesNavigator = () => {
//   return (
//     <PlacesTabStack.Navigator
//       initialRouteName={"Places"}
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {},
//       })}
//       tabBarOptions={{
//         activeTintColor: Colors.primary,
//       }}
//     >
//       <PlacesTabStack.Screen
//         name="Places"
//         component={PlacesListScreen}
//         options={{
//           tabBarLabel: "Places",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="place" color={color} size={size} />
//           ),
//         }}
//       />
//       <PlacesTabStack.Screen
//         name="PlaceDetails"
//         component={PlaceDetailsScreen}
//         options={{
//           tabBarLabel: "Place Details",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="place" color={color} size={size} />
//           ),
//         }}
//       />
//       <PlacesTabStack.Screen
//         name="NewPlace"
//         component={NewPlaceScreen}
//         options={{
//           tabBarLabel: "New Place",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="place" color={color} size={size} />
//           ),
//         }}
//       />
//       <PlacesTabStack.Screen
//         name="Map"
//         component={MapScreen}
//         options={{
//           tabBarLabel: "Map",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="place" color={color} size={size} />
//           ),
//         }}
//       />
//     </PlacesTabStack.Navigator>
//   );
// };
