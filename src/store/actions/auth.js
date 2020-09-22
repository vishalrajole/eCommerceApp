import AsyncStorage from "@react-native-community/async-storage";
import { Platform } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
let timer;

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
    timer.clear();
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
// {
//   "email": "test@test.com",
//   "expiresIn": "3600",
//   "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjczNzVhZmY3MGRmZTNjMzNlOTBjYTM2OWUzYTBlZjQxMzE3MmZkODIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWNvbW1lcmNlYXBwLTI3NzEwIiwiYXVkIjoiZWNvbW1lcmNlYXBwLTI3NzEwIiwiYXV0aF90aW1lIjoxNjAwNjY3MzgwLCJ1c2VyX2lkIjoiZ0FvS01RT0J3QVNWYXZrY1d1bG4wRkw1QVAyMiIsInN1YiI6ImdBb0tNUU9Cd0FTVmF2a2NXdWxuMEZMNUFQMjIiLCJpYXQiOjE2MDA2NjczODAsImV4cCI6MTYwMDY3MDk4MCwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.LXDy2mWrHETJ5hX6NgwMT66NNNaJtanvCRIHWVM1e3agRMSFp2R1AzHHXRbaWURDrXc07njQ14j7iyw8A4vRDpAkcrcSjlsprsu5Eta_t2MfVgUCooY2uEJ3VgGVV0Ts7xw5Llf-h6PkY3ztSHAgrpjvZEisYWpOo9Y4q3O2_RPt9sRcH8Xh01Nljyp8_0yp1cJ0zgfAWp96sa4vvsZ5oTorZrCSGZpijZRJPjwf3FZ3i33ISEUhgxvkDg8_0ro1pzVqho2XEB0vMpw9lkwetSNguJzN9ch8sGPaDxNLGA1Uk6lpS9XpN6M12j5F5G24wL2l4P771p88LLqu3wa-fQ",
//   "kind": "identitytoolkit#SignupNewUserResponse",
//   "localId": "gAoKMQOBwASVavkcWuln0FL5AP22",
//   "refreshToken": "AE0u-Nf-ML7wI6HOCsNBwyTu2C2aZUq9HMgWDuBz10lW5bgOt14bPHNEg3DnD3Xcd8eIYN1kOBhkczkvLei9euwOoK0_0zh9b8g_MqMxhcuULDqP_tfMaggHBwxIXbWOqURfMhr1RlmX-XA8V6YMcD4_atkWVnLnwnVFIbM5RKhOGlxZtSQr3eZwg42qPy4wfnYQopeLYEuhX09p9RPMhHFBX54u54UFYg",
// }
