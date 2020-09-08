import React from "react";
import { StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { deleteProduct } from "../../store/actions/products";
import Colors from "../../styles/colors";

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
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
            onPress={() => {}}
          ></Button>
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(deleteProduct(itemData.item.id));
            }}
          ></Button>
        </ProductItem>
      )}
    ></FlatList>
  );
};
const styles = StyleSheet.create({});

export default UserProductScreen;
