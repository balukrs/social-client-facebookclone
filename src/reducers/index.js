import { combineReducers } from "redux";
import registerReducer from "./register_reducer";
import loginReducer from "./login_reducer";
import userReducer from "./user_reducer";
import postReducer from "./post_reducer";
import userData from "./userdetails_reducer";

export default combineReducers({
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  postdata: postReducer,
  usersdata: userData,
});
