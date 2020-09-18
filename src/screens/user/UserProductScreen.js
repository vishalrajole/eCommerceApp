import React from "react";
import { StyleSheet, FlatList, Button, Alert, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { deleteProduct } from "../../store/actions/products";
import Colors from "../../styles/colors";

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = (productId) => {
    Alert.alert("Delete product", "Do you want to delete this product?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(productId));
        },
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.loadingWrapper}>
        <Text>No Products found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onSelect={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              props.navigation.navigate("EditProduct", {
                productId: itemData.item.id,
              });
            }}
          ></Button>
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          ></Button>
        </ProductItem>
      )}
    />
  );
};
const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProductScreen;
