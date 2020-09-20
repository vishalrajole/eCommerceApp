import React, { useReducer, useCallback } from "react";
import { KeyboardAvoidingView, StyleSheet, View, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../../components/Input";
import Colors from "../../styles/colors";
import { signup } from "../../store/actions/auth";

const FORM_UPDATE = "FORM_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputType]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputType]: action.isValid,
    };
    let updatedIsFormValid = true;
    for (const key in updatedValidities) {
      updatedIsFormValid = updatedIsFormValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      isFormValid: updatedIsFormValid,
    };
  }
  return state;
};

const AuthScreen = () => {
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    isFormValid: false,
  });

  const signUpHandler = () => {
    dispatch(
      signup({
        email: formState.inputValues.email,
        password: formState.inputValues.password,
      })
    );
  };

  const onTextChangeHandler = useCallback(
    (inputType, value, isValid) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value,
        isValid,
        inputType,
      });
    },
    [dispatchFormState]
  );
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.authContainer}
    >
      <LinearGradient colors={["#ffedff", "ffe3ff"]} style={styles.gradient}>
        <View style={styles.formContainer}>
          <ScrollView>
            <Input
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              autoCapitalize="none"
              errorText="enter valid email"
              onInputChange={onTextChangeHandler}
              value={""}
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              required
              secureTextEntry
              minLength={3}
              autoCapitalize="none"
              errorText="enter valid password"
              onInputChange={onTextChangeHandler}
              value={""}
            />
            <View style={styles.button}>
              <Button title="Login" color={Colors.primary} onPress={() => {}} />
            </View>
            <View style={styles.button}>
              <Button
                title="SignUp"
                color={Colors.accent}
                onPress={signUpHandler}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    flex: 1,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  button: {
    marginTop: 10,
  },
});

export default AuthScreen;
