import Product from "../../__mocks__/product";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_PRODUCT = "FETCH_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const ownerId = getState().auth.userId;

    try {
      const response = await fetch(
        `https://ecommerceapp-27710.firebaseio.com/products.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const products = [];
      for (const key in resData) {
        products.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            parseFloat(resData[key].price)
          )
        );
      }
      dispatch({
        type: FETCH_PRODUCT,
        products: products,
        userProducts: products.filter((product) => product.ownerId === ownerId),
      });
    } catch (err) {
      throw err;
    }
  };
};
export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://ecommerceapp-27710.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({
      type: DELETE_PRODUCT,
      productId: productId,
    });
  };
};

export const createProduct = ({ title, description, imageUrl, price }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://ecommerceapp-27710.firebaseio.com/products.json?auth=${token}`,
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
          ownerId: userId,
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
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = ({ productId, title, description, imageUrl }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://ecommerceapp-27710.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          ownerId: userId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update product.");
    }
    dispatch({
      type: UPDATE_PRODUCT,
      productId: productId,
      product: {
        title,
        description,
        imageUrl,
        ownerId: userId,
      },
    });
  };
};
