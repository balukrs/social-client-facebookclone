import React, { useEffect, useRef, useState } from "react";
import "./navbar_style.css";
import Logo from "../../../pictures/motivation.png";
import sample from "../../../pictures/landing_image.jpg";
import Avatar from "@material-ui/core/Avatar";

import { useDispatch, useSelector } from "react-redux";
import { userDiscard } from "../../../actions";
import { useHistory } from "react-router-dom";

import { userFetch } from "../../../actions";
import { userDetails } from "../../../actions";
import { fetchImage } from "../../../actions";

import Createpost from "../createpost/createpost";

const Navbar = ({ btnoff }) => {
  const nav = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anime, setAnime] = useState(false);

  const userID = useSelector((state) => state.user.userid);
  const userstats = useSelector((state) => state.user.userstatus);
  const userimg = useSelector((state) => state.user.userimg);

  useEffect(() => {
    dispatch(userFetch());
    dispatch(userDetails());
  }, [dispatch]);

  useEffect(() => {
    if (userstats === "loggedout") {
      window.location = "/";
    }
    if (userstats === "loggedin") {
      dispatch(fetchImage(userID));
    }
  }, [userstats]);

  useEffect(() => {
    if (anime === true) {
      nav.current.style.display = "block";
    } else {
      nav.current.style.display = "none";
    }
  }, [anime]);

  const Animator = (val) => {
    if (val === "leave") {
      nav.current.style.display = "none";
      setAnime(false);
    }
  };

  return (
    <div className="navbar_container">
      <div className="navbar_logo_container">
        <div>
          <img src={Logo} className="navbar_logo" alt="logo" />
        </div>
        <h1 className="navbar_h1">SocialApp</h1>
        <div className="navbar_createpost_cont">
          {!btnoff ? <Createpost /> : null}
        </div>
      </div>

      <div>
        <div className="navbar_dropdown">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setAnime(!anime);
            }}
          >
            <Avatar
              alt="Travis Howard"
              src={`data:image/webp;base64,${userimg}`}
            />
          </div>
          <ul
            className="navbar_dropdown_list"
            ref={nav}
            onMouseLeave={() => {
              Animator("leave");
            }}
          >
            <span className="navbar_extra_triangle"></span>
            <li>Notifications</li>
            <li onClick={() => history.push("/profile")}>Profile</li>
            <li onClick={() => dispatch(userDiscard())}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
