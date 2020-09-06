import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../../components/OrderItem";
const OrdersScreen = () => {
  const orders = useSelector((state) => state.order.orders);
  return (
    <View style={styles.ordersWrapper}>
      {orders.length ? (
        <FlatList
          data={orders}
          renderItem={(itemData) => <OrderItem order={itemData.item} />}
        ></FlatList>
      ) : (
        <View style={styles.noOrdersWrapper}>
          <Text style={styles.noOrdersText}>No Orders found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ordersWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  noOrdersWrapper: {
    margin: 20,
  },
  noOrdersText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});
export default OrdersScreen;
