import React from "react";
import { View, Button, StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import CartItem from "../../components/CartItem";
import Colors from "../../styles/colors";

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

  const cartProducts = useSelector((state) => {
    const products = [];
    for (const key in state.cart.items) {
      products.push({
        productId: key,
        title: state.cart.items[key].title,
        unitPrice: state.cart.items[key].unitPrice,
        quantity: state.cart.items[key].quantity,
        amount: state.cart.items[key].amount,
      });
    }
    return products;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          disabled={cartProducts.length === 0}
        />
      </View>

      <FlatList
        data={cartProducts}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem product={itemData.item} onDelete={() => {}}></CartItem>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
