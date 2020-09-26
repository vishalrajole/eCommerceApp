import AsyncStorage from "@react-native-community/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const AUTO_LOGIN_TRY = "AUTO_LOGIN_TRY";
let timer;

export const setAutoLoginTry = () => {
  return { type: AUTO_LOGIN_TRY };
};
export const authenticate = (token, userId, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogout(expiryTime));
    dispatch({ type: AUTHENTICATE, userId, token });
  };
};

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
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    storeData({
      token: resData.idToken,
      userId: resData.localId,
      expirationDate: expirationDate,
    });
    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );
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
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    storeData({
      token: resData.idToken,
      userId: resData.localId,
      expirationDate: expirationDate,
    });

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );
  };
};

export const logout = () => {
  clearTimer();
  AsyncStorage.removeItem("userData");

  return { type: LOGOUT };
};

const setLogout = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const storeData = async ({ token, userId, expirationDate }) => {
  try {
    const jsonValue = JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    });
    await AsyncStorage.setItem("userData", jsonValue);
  } catch (e) {
    console.log("failed to save token: ", e);
  }
};
