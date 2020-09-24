import { AUTHENTICATE, LOGOUT, AUTO_LOGIN_TRY } from "../actions/auth";

// test@test.com 123456
const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };

    case LOGOUT:
      return initialState;
    case AUTO_LOGIN_TRY:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
