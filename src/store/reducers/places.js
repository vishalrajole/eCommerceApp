import { ADD_PLACE, FETCH_PLACES } from "../actions/places";
import Place from "../../__mocks__/place";

const initialState = {
  places: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_PLACE:
      const { title, ownerId } = actions.place;
      const place = new Place(id, title, ownerId);
      return {
        ...state,
        places: state.places.concat(place),
      };

    case FETCH_PLACES:
      return {
        places: actions.places,
      };

    default:
      return state;
  }
};
