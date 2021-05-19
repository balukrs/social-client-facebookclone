const INIT_RED = {
  userstatus: null,
  userid: null,
  username: null,
  userimg: null,
};

const userReducer = (state = INIT_RED, action) => {
  switch (action.type) {
    case "USER_LOGGIN":
      return {
        ...state,
        userstatus: "loggedin",
        userid: action.payload.id,
        username: action.payload.username,
      };
    case "USER_LOGGOUT":
      return {
        ...state,
        userstatus: "loggedout",
        userid: null,
        username: null,
        userimg: null,
      };
    case "USER_IMAGE":
      return { ...state, userimg: action.payload };
    default:
      return state;
  }
};

export default userReducer;
