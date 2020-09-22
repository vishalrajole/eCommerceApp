import React, { useEffect, useRef } from "react";
import ShopNavigator from "./ShopNavigator";
import { useSelector } from "react-redux";

let navigationRef = null;

const NavigationWrapper = (props) => {
  navigationRef = useRef(null);

  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navigationRef.current.navigate("Auth");
    }
  }, [isAuth]);

  return <ShopNavigator />;
};

export { NavigationWrapper, navigationRef };
