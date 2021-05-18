import React from "react";
import "./homepage_style.css";

import Navbar from "./navbar/navbar";

import Postdetails from "./postdetails/postdetails";
import Userdetails from "./userdetails/userdetails";
// Createpost component is now moved to navbar component

const Homepage = () => {
  return (
    <div className="home_container">
      <div className="home_fixed_cont">
        <Navbar />
      </div>
      <Postdetails />
      <Userdetails />
    </div>
  );
};

export default Homepage;
