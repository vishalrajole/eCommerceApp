import React, { useEffect } from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { addToCart } from "../../store/actions/cart";
import { fetchProducts } from "../../store/actions/products";
import Colors from "../../styles/colors";

const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onSelect = (itemId, itemTitle) => {
    props.navigation.navigate("ProductDetails", {
      productId: itemId,
      productTitle: itemTitle,
    });
  };
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

ProductOverviewScreen.navigationOptions = {
  headerTitle: "sdsdf",
};
export default ProductOverviewScreen;
