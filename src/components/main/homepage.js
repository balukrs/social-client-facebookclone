import React, { useState, useEffect } from "react";
import "./homepage_style.css";
import { useSelector, useDispatch } from "react-redux";

import { userFetch } from "../../actions";

import Navbar from "./navbar/navbar";
import Createpost from "./createpost/createpost";

const Homepage = () => {
  const dispatch = useDispatch();
  const ID = useSelector((state) => state.user.userid);
  const userstats = useSelector((state) => state.user.userstatus);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(userFetch());
  }, [dispatch]);

  useEffect(() => {
    if (ID) {
      setUserId(ID);
    }
    if (userstats === "loggedout") {
      window.location = "/";
    }
  }, [ID, userstats]);

  return (
    <div className="home_container">
      <Navbar />
      <div className="createpost_cont">
        <Createpost />
      </div>
    </div>
  );
};

export default Homepage;
