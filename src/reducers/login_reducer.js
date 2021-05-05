const INITIAL_RED = {
  loginstatus: null,
  loginId: null,
  loginUser: null,
  loginerror: null,
};

const loginReducer = (state = INITIAL_RED, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return { ...state, loginstatus: "failed", loginerror: action.payload };
    case "LOGIN_SUCCESS":
      return { ...state, loginstatus: "success" };
    case "LOGIN_RESET":
      return { ...state, loginstatus: null };
    default:
      return state;
  }
};

export default loginReducer;
