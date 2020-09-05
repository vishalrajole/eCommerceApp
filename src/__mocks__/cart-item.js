class CartItem {
  constructor({ quantity, unitPrice, title, amount }) {
    this.quantity = quantity;
    this.title = title;
    this.unitPrice = unitPrice;
    this.amount = amount;
  }
}

export default CartItem;
