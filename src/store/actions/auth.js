export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";

export const signup = ({ email, password }) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDShoFb5hFfTtUZzyGMX0L5qosShca_LN8`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorType = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorType === "EMAIL_EXISTS") {
        message = "Email id already exists";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch({
      type: SIGN_UP,
    });
  };
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDShoFb5hFfTtUZzyGMX0L5qosShca_LN8`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorType = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorType === "EMAIL_NOT_FOUND") {
        message = "Email id does not exists";
      } else if (errorType === "INVALID_PASSWORD") {
        message = "Invalid password";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch({
      type: LOGIN,
    });
  };
};
