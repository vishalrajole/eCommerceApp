import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { initDB, destroyDB } from "./helpers/db";
import configureStore from "./store/configure-store";
import AppNavigator from "./navigation/AppNavigator";

const store = configureStore();

/* destroys sqlite db */
// destroyDB()
//   .then(() => {
//     console.log("destroyed database");
//   })
//   .catch((err) => {
//     console.log("db destroy failed ", err);
//   });

/* initialised sqlite db */
initDB()
  .then(() => {
    console.log("initialised database");
  })
  .catch((err) => {
    console.log("db initialised failed ", err);
  });

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
      <AppNavigator />
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
