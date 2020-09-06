import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders);
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.orderAmount}</Text>}
    ></FlatList>
  );
};

export default OrdersScreen;
