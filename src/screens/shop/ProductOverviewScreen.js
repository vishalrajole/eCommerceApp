import React, { useEffect, useState } from "react";
import {
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { addToCart } from "../../store/actions/cart";
import { fetchProducts } from "../../store/actions/products";
import Colors from "../../styles/colors";

const ProductOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const getProducts = async () => {
    setIsLoading(true);
    setError(false);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(true);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", getProducts);
    return unsubscribe;
  }, [getProducts]);

  const onSelect = (itemId, itemTitle) => {
    props.navigation.navigate("ProductDetails", {
      productId: itemId,
      productTitle: itemTitle,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.loadingWrapper}>
        <Text>No Products found</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loadingWrapper}>
        <Text>Something went wrong while fetching products</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => {
            onSelect(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              onSelect(itemData.item.id, itemData.item.title);
            }}
          ></Button>
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => dispatch(addToCart(itemData.item))}
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
ProductOverviewScreen.navigationOptions = {
  headerTitle: "sdsdf",
};
export default ProductOverviewScreen;
