import Place from "../../__mocks__/place";
import * as FileSystem from "expo-file-system";
// import { insertPlace, fetchPlacesFromDB } from "../../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACES = "FETCH_PLACES";

// export const loadPlacesFromDB = () => {
//   return async (dispatch) => {
//     try {
//       const dbResult = await fetchPlacesFromDB();
//       console.log("dbResult: ", dbResult.rows._array);
//     } catch (err) {
//       console.log("error in loadPlacesFromDB", err);
//     }
//   };
// };

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

export const addPlace = ({ title, imageUri }) => {
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
      const fileName = imageUri.split("/").pop();
      const newPath = FileSystem.documentDirectory + fileName;
      try {
        await FileSystem.moveAsync({
          from: imageUri,
          to: newPath,
        });

        // const dbResult = await insertPlace(
        //   title,
        //   newPath,
        //   "DummyAddress",
        //   15.6,
        //   12.3,
        //   resData.name
        // );
        // console.log("added into DB: ", dbResult);

        dispatch({
          type: ADD_PLACE,
          place: {
            id: resData.name,
            title,
            imageUri: newPath,
            ownerId: userId,
          },
        });
      } catch (err) {
        console.log("failed to move file", err);
        throw err;
      }
    } catch (err) {
      console.log("failed to add place", err);
      throw err;
    }
  };
};
