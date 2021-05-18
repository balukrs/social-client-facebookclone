import React from "react";
import "./userdetails_style.css";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";

const Userdetails = () => {
  const users = useSelector((state) => state.usersdata.users);

  if (!users) {
    return null;
  }

  function toBase64(arr) {
    arr = new Uint8Array(arr);
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }

  return (
    <div className="userdetails_cont">
      <div className="userdetail_header">
        <h2>Users</h2>
      </div>
      {users.map((user, index) => {
        return (
          <div className="userdetail_user_cont" key={index}>
            <div>
              <Avatar
                style={{ width: "30px", height: "30px" }}
                src={`data:image/webp;base64,${
                  user.img ? toBase64(user.img.data) : ""
                }`}
                alt="Travis Howard"
              ></Avatar>
            </div>
            <div className="userdetail_username">
              <h3>{user.username}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Userdetails;
