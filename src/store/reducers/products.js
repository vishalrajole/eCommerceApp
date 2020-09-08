import PRODUCTS from "../../__mocks__/data";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter((product) => {
          return product.id !== action.productId;
        }),
        availableProducts: state.availableProducts.filter((product) => {
          return product.id !== action.productId;
        }),
      };
    default:
      return state;
  }
};
