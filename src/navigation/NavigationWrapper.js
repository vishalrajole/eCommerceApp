import React, { useEffect, useRef } from "react";
import ShopNavigator from "./ShopNavigator";
import { useSelector } from "react-redux";

export const navigationRef = useRef(null);

const NavigationWrapper = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navigationRef.current.navigate("Auth");
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default NavigationWrapper;
