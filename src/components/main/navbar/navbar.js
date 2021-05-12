import React, { useEffect, useRef, useState } from "react";
import "./navbar_style.css";
import Logo from "../../../pictures/motivation.png";
import sample from "../../../pictures/landing_image.jpg";

import { useDispatch } from "react-redux";
import { userDiscard } from "../../../actions";

import Createpost from "../createpost/createpost";

const Navbar = () => {
  const nav = useRef();
  const dispatch = useDispatch();
  const [anime, setAnime] = useState(false);

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
          <Createpost />
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
            <img src={sample} className="navbar_account_img" alt="avatar" />
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
            <li>Profile</li>
            <li onClick={() => dispatch(userDiscard())}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
