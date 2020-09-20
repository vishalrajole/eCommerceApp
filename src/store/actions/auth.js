export const SIGN_UP = "SIGN_UP";

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
      throw new Error("Failed to sign up.", response);
    }

    const resData = await response.json();
    dispatch({
      type: SIGN_UP,
    });
  };
};
