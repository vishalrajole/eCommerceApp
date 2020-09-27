import Place from "../../__mocks__/place";

export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACES = "FETCH_PLACES";

export const fetchPlaces = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const ownerId = getState().auth.userId;

    try {
      const response = await fetch(
        `https://ecommerceapp-27710.firebaseio.com/places.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const places = [];
      for (const key in resData) {
        places.push(
          new Place(
            key,
            resData[key].title,
            resData[key].ownerId,
            resData[key].imageUri
          )
        );
      }
      dispatch({
        type: FETCH_PLACES,
        places,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addPlace = ({ title, imageUri = "not provided" }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://ecommerceapp-27710.firebaseio.com/places.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            imageUri,
            ownerId: userId,
          }),
        }
      );

      const resData = await response.json();
      dispatch({
        type: ADD_PLACE,
        place: {
          id: resData.name,
          title,
          imageUri,
          ownerId: userId,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};
