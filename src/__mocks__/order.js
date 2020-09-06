class Order {
  constructor({ id, orderItems, orderAmount, date }) {
    this.id = id;
    this.orderItems = orderItems;
    this.orderAmount = orderAmount;
    this.date = date;
  }
}

export default Order;
