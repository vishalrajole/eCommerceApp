export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

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
