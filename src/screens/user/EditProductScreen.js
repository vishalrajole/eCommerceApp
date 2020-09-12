import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { updateProduct, createProduct } from "../../store/actions/products";
import CustomHeaderButton from "../../components/HeaderButton";

const EditProductScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const productId = route?.params?.productId;

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [isTitleValid, setTitleValid] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = () => {
    if (!isTitleValid) {
      Alert.alert("Invalid Form", "Please check validation erros", [
        { text: "Close" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        updateProduct({
          productId,
          title,
          description,
          imageUrl,
        })
      );
    } else {
      dispatch(
        createProduct({
          title,
          description,
          imageUrl,
          price,
        })
      );
    }
    navigation.goBack();
  };

  const titleChangeHandler = (text) => {
    if (text.trim().length === 0) {
      setTitleValid(false);
    } else {
      setTitleValid(true);
    }
    setTitle(text);
  };

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [dispatch, productId, title, description, imageUrl, price]);

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
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler}
            autoCapitalize={"sentences"}
          ></TextInput>
          {!isTitleValid && <Text>Enter valid title</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          ></TextInput>
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType={"decimal-pad"}
            ></TextInput>
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          ></TextInput>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
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
});
export default EditProductScreen;
