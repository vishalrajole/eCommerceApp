import Order from "../../__mocks__/order";
export const ORDER_NOW = "ORDER_NOW";
export const FETCH_ORDERS = "FETCH_ORDERS";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://ecommerceapp-27710.firebaseio.com/orders/u1.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const orders = [];
      for (const key in resData) {
        orders.push(
          new Order({
            id: key,
            orderItems: resData[key].orderItems,
            orderAmount: resData[key].orderAmount,
            date: new Date(resData[key].date),
          })
        );
      }
      dispatch({ type: FETCH_ORDERS, orders });
    } catch (err) {
      throw err;
    }
  };
};
export const orderNow = ({ orderItems, orderAmount }) => {
  return async (dispatch) => {
    const orderDate = new Date();
    const response = await fetch(
      `https://ecommerceapp-27710.firebaseio.com/orders/u1.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderItems,
          orderAmount,
          date: orderDate,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save product.");
    }

    const resData = await response.json();
    dispatch({
      type: ORDER_NOW,
      orderData: { id: resData.name, orderItems, orderAmount, date: orderDate },
    });
  };
};
