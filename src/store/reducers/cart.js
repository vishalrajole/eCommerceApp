import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../actions/cart";
import CartItem from "../../__mocks__/cart-item";

const initialState = {
  items: {},
  cartTotalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.product;

      let itemToAdd;

      if (state.items[product.id]) {
        itemToAdd = new CartItem({
          quantity: state.items[product.id].quantity + 1,
          unitPrice: product.price,
          title: product.title,
          amount: state.items[product.id].amount + product.price,
        });
      } else {
        itemToAdd = new CartItem({
          quantity: 1,
          unitPrice: product.price,
          title: product.title,
          amount: product.price,
        });
      }
      return {
        ...state,
        items: { ...state.items, [product.id]: itemToAdd },
        cartTotalAmount: state.cartTotalAmount + product.price,
      };
    }
    case REMOVE_FROM_CART: {
      const selectedProduct = state.items[action.productId];
      const quantity = selectedProduct.quantity;
      let updatedCartItems;

      if (quantity > 1) {
        const updatedCartItem = new CartItem({
          quantity: selectedProduct.quantity - 1,
          unitPrice: selectedProduct.unitPrice,
          title: selectedProduct.title,
          amount: selectedProduct.amount - selectedProduct.unitPrice,
        });
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }

      return {
        ...state,
        items: updatedCartItems,
        cartTotalAmount: state.cartTotalAmount - selectedProduct.unitPrice,
      };
    }
    case CLEAR_CART: {
      return initialState;
    }
  }
  return state;
};
