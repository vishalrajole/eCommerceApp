import React, { useState, useCallback, useReducer } from "react";
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../styles/colors";
import { addPlace } from "../../store/actions/places";
import Input from "../../components/Input";
import ImagePicker from "../../components/ImagePicker";
import LocationPicker from "../../components/LocationPicker";

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

const NewPlaceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [imgUri, setImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
    },
    inputValidities: {
      title: false,
    },
    isFormValid: false,
  });

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

  const onImageSelect = (imageUri) => {
    setImageUri(imageUri);
  };

  const onLocationSelect = () => {};

  const addPlaceHandler = useCallback(async () => {
    if (!formState.isFormValid) {
      Alert.alert("Form Error", "Please fill all details", [{ text: "Close" }]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(
        addPlace({
          title: formState.inputValues.title,
          imageUri: imgUri,
        })
      );

      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, formState, imgUri]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loading}>
        <Text>An Error Occured!</Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText={"Enter valid title"}
            onInputChange={onTextChangeHandler}
            value={""}
            isInitiallyValid={true}
            required
          />
          <ImagePicker onImageSelect={onImageSelect} />
          <LocationPicker onLocationSelect={onLocationSelect} />
          <Button
            title="Save place"
            color={Colors.primary}
            onPress={addPlaceHandler}
            disabled={!formState.isFormValid}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    marginBottom: 15,
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewPlaceScreen;
