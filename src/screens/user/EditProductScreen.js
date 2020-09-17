import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { updateProduct, createProduct } from "../../store/actions/products";
import CustomHeaderButton from "../../components/HeaderButton";
import Input from "../../components/Input";
import Colors from "../../styles/colors";

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

const EditProductScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const productId = route?.params?.productId;

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    isFormValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(async () => {
    if (!formState.isFormValid) {
      Alert.alert("Form Error", "Please fill all details", [{ text: "Close" }]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (editedProduct) {
        await dispatch(
          updateProduct({
            productId,
            title: formState.inputValues.title,
            description: formState.inputValues.description,
            imageUrl: formState.inputValues.imageUrl,
          })
        );
      } else {
        await dispatch(
          createProduct({
            title: formState.inputValues.title,
            description: formState.inputValues.description,
            imageUrl: formState.inputValues.imageUrl,
            price: formState.inputValues.price,
          })
        );
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, productId, formState]);

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

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error", error, [{ text: "Okay" }]);
    }
  }, [error]);

  navigation.setOptions({
    title: productId ? "Edit Product" : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitHandler}
        ></Item>
      </HeaderButtons>
    ),
  });

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size={"large"}
          color={Colors.primary}
        ></ActivityIndicator>
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
            errorText={"Enter title"}
            onInputChange={onTextChangeHandler}
            value={editedProduct ? editedProduct.title : ""}
            isInitiallyValid={!!editedProduct}
            required
          />

          <Input
            id="imageUrl"
            label="Image Url"
            errorText={"Enter image url"}
            onInputChange={onTextChangeHandler}
            value={editedProduct ? editedProduct.imageUrl : ""}
            isInitiallyValid={!!editedProduct}
            required
          />

          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText={"Enter price"}
              keyboardType="decimal-pad"
              onInputChange={onTextChangeHandler}
              value={editedProduct ? editedProduct.price : ""}
              required
            />
          )}

          <Input
            id="description"
            label="Description"
            errorText={"Enter description"}
            multiline
            onInputChange={onTextChangeHandler}
            value={editedProduct ? editedProduct.description : ""}
            isInitiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default EditProductScreen;
