import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";
import Colors from "../styles/colors";
import { authenticate, setAutoLoginTry } from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (!userData) {
          //props.navigation.navigate("Auth");
          dispatch(setAutoLoginTry());
          return;
        }
        const { token, userId, expiryDate } = JSON.parse(userData);
        const expirationDate = new Date(expiryDate);
        if (expirationDate <= new Date() || !token || !userId) {
          //props.navigation.navigate("Auth");
          dispatch(setAutoLoginTry());
          return;
        }
        const expirationTime = expirationDate.getTime() - new Date().getTime();

        //props.navigation.navigate("App");
        dispatch(authenticate(token, userId, expirationTime));
      } catch (e) {
        console.log("failed to fetch stored token");
      }
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={Colors.primary}
      ></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default StartupScreen;
