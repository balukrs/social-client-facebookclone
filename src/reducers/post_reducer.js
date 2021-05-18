const INIT_RED = {
  postids: [],
  poststatus: null,
};

const postReducer = (state = INIT_RED, action) => {
  switch (action.type) {
    case "POSTID_FETCH":
      return { ...state, postids: action.payload };
    case "POST_SUCCESS":
      return { ...state, poststatus: "successs" };
    case "POST_RESET":
      return { ...state, poststatus: null };
    default:
      return state;
  }
};

export default postReducer;
