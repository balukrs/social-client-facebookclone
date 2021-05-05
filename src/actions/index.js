import Api from "../api/social";

export const registerUser = (formValues) => {
  return async (dispatch) => {
    const response = await Api.post("/register", formValues);
    if (response.data !== "success") {
      dispatch({
        type: "REGISTER_ERROR",
        payload: response.data.details
          ? response.data.details[0].message
          : response.data,
      });
    } else {
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: response.data,
      });
    }
  };
};

export const loginUser = (formValues) => {
  return async (dispatch) => {
    const response = await Api.post("/login", formValues, {
      withCredentials: true,
    });
    if (response.data !== "loginsuccess") {
      dispatch({
        type: "LOGIN_ERROR",
        payload: response.data.details
          ? response.data.details[0].message
          : response.data,
      });
    } else {
      dispatch({
        type: "LOGIN_SUCCESS",
      });
    }
  };
};

export const userFetch = () => {
  return async (dispatch) => {
    const response = await Api.get("/login", {
      withCredentials: true,
    });
    if (response.data === "loggedout") {
      dispatch({ type: "USER_LOGGOUT" });
    } else {
      dispatch({ type: "USER_LOGGIN", payload: response.data.id });
    }
  };
};

export const userDiscard = () => {
  return async (dispatch) => {
    const response = await Api.get("/logout", { withCredentials: true });
    if (response.data === "cookiecleared") {
      dispatch({ type: "USER_LOGGOUT" });
    }
  };
};
