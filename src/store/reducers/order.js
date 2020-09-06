import { ORDER_NOW } from "../actions/order";
import Order from "../../__mocks__/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_NOW:
      const newOrder = new Order({
        id: new Date().toString(),
        orderItems: action.orderData.orderItems,
        orderAmount: action.orderData.orderAmount,
        date: new Date(),
      });
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};
