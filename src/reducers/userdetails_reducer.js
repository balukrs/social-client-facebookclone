const INIT_RED = {
  users: null,
};

const userData = (state = INIT_RED, action) => {
  switch (action.type) {
    case "USER_DETAILS":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default userData;
