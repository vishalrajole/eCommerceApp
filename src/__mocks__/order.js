import moment from "moment";
class Order {
  constructor({ id, orderItems, orderAmount, date }) {
    this.id = id;
    this.orderItems = orderItems;
    this.orderAmount = orderAmount;
    this.date = date;
  }

  get formattedDate() {
    return moment(this.date).format("MM DD YYYY hh:mm");
  }
}

export default Order;
