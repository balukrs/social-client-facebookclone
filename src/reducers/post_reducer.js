const INIT_RED = {
  postids: [],
};

const postReducer = (state = INIT_RED, action) => {
  switch (action.type) {
    case "POSTID_FETCH":
      return { ...state, postids: action.payload };
    default:
      return state;
  }
};

export default postReducer;
