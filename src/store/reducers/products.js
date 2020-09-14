import PRODUCTS from "../../__mocks__/data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  FETCH_PRODUCT,
} from "../actions/products";
import Product from "../../__mocks__/product";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return {
        availableProducts: action.products,
        userProducts: action.products.filter(
          (product) => product.ownerId === "u1"
        ),
      };
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
    case CREATE_PRODUCT:
      const { title, description, imageUrl, price, id } = action.product;
      const product = new Product(
        id,
        "u1",
        title,
        imageUrl,
        description,
        price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(product),
        userProducts: state.userProducts.concat(product),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (product) => product.id === action.productId
      );
      const updatedProduct = new Product(
        action.productId,
        state.userProducts[productIndex].ownerId,
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.productId
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    default:
      return state;
  }
};
