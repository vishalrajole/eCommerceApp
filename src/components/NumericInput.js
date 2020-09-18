import React, { useReducer, useEffect } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const NUMERIC_INPUT_CHANGE = "NUMERIC_INPUT_CHANGE";
const NUMERIC_INPUT_BLUR = "NUMERIC_INPUT_BLUR";

const NUMERIC_VALIDATION = /^\d+(\.\d{1,2})?$/;

const inputReducer = (state, action) => {
  switch (action.type) {
    case NUMERIC_INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case NUMERIC_INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const NumericInput = (props) => {
  const { required, onNumericInputChange, isInitiallyValid, id, value } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: value ? value : "",
    isValid: isInitiallyValid ? isInitiallyValid : false,
    touched: false,
  });

  useEffect(() => {
    if (inputState.touched) {
      onNumericInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onNumericInputChange, id]);

  const numericChangeHandler = (input) => {
    let isValid = true;
    if (required && input.trim().length === 0) {
      isValid = false;
    }
    if (!NUMERIC_VALIDATION.test(input)) {
      isValid = false;
    }
    dispatch({ type: NUMERIC_INPUT_CHANGE, value: input, isValid: isValid });
  };
  const onBlurHandler = () => {
    dispatch({ type: NUMERIC_INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={numericChangeHandler}
        onBlur={onBlurHandler}
        keyboardType="numeric"
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "open-sans",
    fontSize: 13,
    color: "red",
  },
});

export default NumericInput;
