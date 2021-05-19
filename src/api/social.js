import Axios from "axios";

const Api = Axios.create({
  baseURL: "https://socialapp-back.herokuapp.com/social",
});

export default Api;
