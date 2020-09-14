import Product from "../../__mocks__/product";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_PRODUCT = "FETCH_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://ecommerceapp-27710.firebaseio.com/products.json"
    );

    const resData = await response.json();
    const products = [];
    for (const key in resData) {
      products.push(
        new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }
    dispatch({ type: FETCH_PRODUCT, products: products });
  };
};
export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId: productId };
};

export const createProduct = ({ title, description, imageUrl, price }) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://ecommerceapp-27710.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      product: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = ({ productId, title, description, imageUrl }) => {
  return {
    type: UPDATE_PRODUCT,
    productId: productId,
    product: {
      title,
      description,
      imageUrl,
    },
  };
};
