const INIT_RED = {
  userstatus: null,
  userid: null,
};

const userReducer = (state = INIT_RED, action) => {
  switch (action.type) {
    case "USER_LOGGIN":
      return { ...state, userstatus: "loggedin", userid: action.payload };
    case "USER_LOGGOUT":
      return { ...state, userstatus: "loggedout", userid: null };
    default:
      return state;
  }
};

export default userReducer;
