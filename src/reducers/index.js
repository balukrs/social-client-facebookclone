import { combineReducers } from "redux";
import registerReducer from "./register_reducer";
import loginReducer from "./login_reducer";
import userReducer from "./user_reducer";

export default combineReducers({
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
});
