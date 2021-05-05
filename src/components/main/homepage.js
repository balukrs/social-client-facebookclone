import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { userFetch } from "../../actions";
import { userDiscard } from "../../actions";

const Homepage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ID = useSelector((state) => state.user.userid);
  const userstats = useSelector((state) => state.user.userstatus);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(userFetch());
  }, []);

  useEffect(() => {
    if (ID) {
      setUserId(ID);
    }
    if (userstats === "loggedout") {
      history.push("/");
    }
  }, [ID, userstats]);

  return (
    <div>
      <h1>Welcome to homepage</h1>
      <span>{`User Id:${userId}`}</span>
      <button onClick={() => dispatch(userDiscard())}>Logout</button>
    </div>
  );
};

export default Homepage;
