import React, { useEffect } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ProductDetailsScreen = (props) => {
  const { route } = props;
  const { productId, productTitle } = route.params;

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  props.navigation.setOptions({ title: productTitle });

  return (
    <ScrollView>
      <Text>{selectedProduct.title}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ProductDetailsScreen;
