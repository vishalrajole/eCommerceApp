export const ORDER_NOW = "ORDER_NOW";

export const orderNow = ({ orderItems, orderAmount }) => {
  return async (dispatch) => {
    const orderDate = new Date();
    const response = await fetch(
      `https://ecommerceapp-27710.firebaseio.com/orders/u1.json`,
      {
        method: "PATCH",
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
