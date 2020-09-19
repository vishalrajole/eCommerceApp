import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import CartItem from "./CartItem";
import order from "../store/reducers/order";
import Colors from "../styles/colors";

const OrderItem = (props) => {
  const { order } = props;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${parseFloat(order.orderAmount)}</Text>
        <Text style={styles.date}>{order.formattedDate}</Text>
      </View>
      <Button
        title={"Details"}
        color={Colors.primary}
        onPress={() => setShowDetails((prevState) => !prevState)}
      ></Button>
      {showDetails && (
        <View>
          {order.orderItems.map((item) => (
            <CartItem
              product={item}
              showDeleteButton={false}
              key={item.productId}
            ></CartItem>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
});
export default OrderItem;
