import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import configureStore from "./store/configure-store";
import NavigationWrapper from "./navigation/NavigationWrapper";
import { navigationRef } from "./navigation/NavigationWrapper";

const store = configureStore();

const App = () => {
  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  // HOT reload
  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./App", App);
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <NavigationWrapper />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
