import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  const { product } = props;
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{product.quantity} </Text>
        <Text style={styles.title}>{product.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>${product.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={props.onDelete} style={styles.deleteButton}>
          <Ionicons
            name={Platform === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color={"red"}
          ></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {},
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
