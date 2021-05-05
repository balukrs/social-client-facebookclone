const INITIAL_RED = {
  registerstatus: null,
  registererror: null,
};

const registerReducer = (state = INITIAL_RED, action) => {
  switch (action.type) {
    case "REGISTER_ERROR":
      return {
        ...state,
        registerstatus: "failed",
        registererror: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        registerstatus: "success",
        registererror: action.payload,
      };
    default:
      return state;
  }
};

export default registerReducer;
