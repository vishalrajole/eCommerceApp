import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../actions/cart";
import { DELETE_PRODUCT } from "../actions/products";
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
          unitPrice: parseFloat(product.price),
          title: product.title,
          amount: state.items[product.id].amount + parseFloat(product.price),
        });
      } else {
        itemToAdd = new CartItem({
          quantity: 1,
          unitPrice: parseFloat(product.price),
          title: product.title,
          amount: parseFloat(product.price),
        });
      }
      return {
        ...state,
        items: { ...state.items, [product.id]: itemToAdd },
        cartTotalAmount: (
          parseFloat(state.cartTotalAmount) + parseFloat(product.price)
        ).toFixed(2),
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
          amount:
            selectedProduct.amount - parseFloat(selectedProduct.unitPrice),
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
        cartTotalAmount: (
          parseFloat(state.cartTotalAmount) -
          parseFloat(selectedProduct.unitPrice)
        ).toFixed(2),
      };
    }
    case CLEAR_CART: {
      return initialState;
    }
    case DELETE_PRODUCT: {
      if (!state.items[action.productId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const updatedItemTotal = parseFloat(state.items[action.productId].amount);
      delete updatedItems[action.productId];

      return {
        ...state,
        items: updatedItems,
        cartTotalAmount: (
          parseFloat(state.cartTotalAmount) - parseFloat(updatedItemTotal)
        ).toFixed(2),
      };
    }
  }
  return state;
};
