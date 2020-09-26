import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator, AuthNavigator } from "./ShopNavigator";
import StartupScreen from "../screens/StartupScreen";

import { useSelector } from "react-redux";

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      <DrawerNavigator />
      {/* {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />} */}
    </NavigationContainer>
  );
};

export default AppNavigator;
