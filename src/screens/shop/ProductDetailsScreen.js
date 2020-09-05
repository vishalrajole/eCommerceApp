import React, { useEffect } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Button,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../styles/colors";
import Variables from "../../styles/variables";

const ProductDetailsScreen = (props) => {
  const { route } = props;
  const { productId, productTitle } = route.params;

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  props.navigation.setOptions({ title: productTitle });

  return (
    <ScrollView>
      <Image
        source={{ uri: selectedProduct.imageUrl }}
        style={styles.image}
      ></Image>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {}}
        ></Button>
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>${selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 20,
    alignItems: "center",
  },
  price: {
    fontSize: Variables.PRIMARY_FONT_SIZE,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: Variables.SECONDARY_FONT_SIZE,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default ProductDetailsScreen;
