import Api from "../api/social";

// Register user
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

// Login User
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

// Login Validation
export const userFetch = () => {
  return async (dispatch) => {
    const response = await Api.get("/login", {
      withCredentials: true,
    });
    if (response.data === "loggedout") {
      dispatch({ type: "USER_LOGGOUT" });
    } else {
      dispatch({ type: "USER_LOGGIN", payload: response.data });
    }
  };
};

// Logginout User
export const userDiscard = () => {
  return async (dispatch) => {
    const response = await Api.get("/logout", { withCredentials: true });
    if (response.data === "cookiecleared") {
      dispatch({ type: "USER_LOGGOUT" });
    }
  };
};

// Postings using form-data
export const postData = (formData) => {
  return async (dispatch) => {
    const response = await Api.post("/post", formData);
  };
};

//Fetching all post id's
export const fetchPost = () => {
  return async (dispatch) => {
    const response = await Api.get("/postid");
    dispatch({ type: "POSTID_FETCH", payload: response.data });
  };
};
