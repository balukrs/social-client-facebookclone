import React, { useState, useEffect } from "react";
import "./profile_style.css";

import Navbar from "../main/navbar/navbar";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Profilepic from "./profile_pic";
import Editprofile from "./edit_password_user";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#E79F4B",
    },
  },
});

const Profile = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const returnFunc = () => {};

  return (
    <div>
      <Navbar btnoff={true} />
      <div className="profile_menu">
        <MuiThemeProvider theme={theme}>
          <Tabs
            value={value}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
          >
            <Tab label="UPLOAD PICTURE" />
            <Tab label="EDIT PROFILE" />
            <Tab label="DELETE POSTS" />
          </Tabs>
        </MuiThemeProvider>
      </div>
      <div>
        {(() => {
          switch (value) {
            case 0:
              return <Profilepic />;
            case 1:
              return <Editprofile />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default Profile;
