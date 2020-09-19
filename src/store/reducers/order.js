import { ORDER_NOW, FETCH_ORDERS } from "../actions/order";
import Order from "../../__mocks__/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_NOW:
      const newOrder = new Order({
        id: action.orderData.id,
        orderItems: action.orderData.orderItems,
        orderAmount: action.orderData.orderAmount,
        date: action.orderData.date,
      });

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    case FETCH_ORDERS:
      return {
        orders: action.orders,
      };
    default:
      return state;
  }
};
