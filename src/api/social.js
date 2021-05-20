import Axios from "axios";

const Api = Axios.create({
  baseURL: "https://socialapp-backen.herokuapp.com/social",
});

export default Api;
