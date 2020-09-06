export const ORDER_NOW = "ORDER_NOW";

export const orderNow = ({ orderItems, orderAmount }) => {
  return {
    type: ORDER_NOW,
    orderData: { orderItems, orderAmount },
  };
};
