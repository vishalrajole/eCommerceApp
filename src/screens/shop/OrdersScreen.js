import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/OrderItem";
import { fetchOrders } from "../../store/actions/order";
import Colors from "../../styles/colors";

const OrdersScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  const getOrders = async () => {
    setIsLoading(true);
    await dispatch(fetchOrders());
    setIsLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
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
  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OrdersScreen;
