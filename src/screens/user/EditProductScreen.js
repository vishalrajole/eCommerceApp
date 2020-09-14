import React, { useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { updateProduct, createProduct } from "../../store/actions/products";
import CustomHeaderButton from "../../components/HeaderButton";
import Input from "../../components/Input";

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

  const submitHandler = useCallback(() => {
    if (!formState.isFormValid) {
      Alert.alert("Form Error", "Please fill all details", [{ text: "Close" }]);
      return;
    }
    if (editedProduct) {
      dispatch(
        updateProduct({
          productId,
          title: formState.inputValues.title,
          description: formState.inputValues.description,
          imageUrl: formState.inputValues.imageUrl,
        })
      );
    } else {
      dispatch(
        createProduct({
          title: formState.inputValues.title,
          description: formState.inputValues.description,
          imageUrl: formState.inputValues.imageUrl,
          price: formState.inputValues.price,
        })
      );
    }
    navigation.goBack();
  }, [dispatch, productId, formState]);

  const onTextChangeHandler = useCallback(
    (inputType, value, isValid) => {
      console.log("input: ", inputType, value, isValid);
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
});
export default EditProductScreen;
