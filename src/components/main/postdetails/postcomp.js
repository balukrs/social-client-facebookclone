import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#ebeae6",
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 20,
    maxWidth: 500,
  },
}));

function toBase64(arr) {
  arr = new Uint8Array(arr);
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
}

function timeConv(data) {
  const time = moment(data);
  return time.calendar();
}
const Api = Axios.create({
  baseURL: "http://localhost:5000/social",
});

const Postdata = ({ id }) => {
  const classes = useStyles();
  const anime = require("animejs");
  const [post, setPost] = useState(null);
  const [commbox, setCommbox] = useState(false);
  const commentContRef = useRef();

  const dataFetch = async (ID) => {
    const response = await Api.get(`/post/${ID}`);
    setPost(response.data);
  };

  useEffect(() => {
    if (id) {
      dataFetch(id);
    }
  }, [id]);

  const commentExpander = () => {
    if (commbox === false) {
      anime({
        targets: ".post_comment_container",
        keyframes: [{ height: "0" }, { height: "100%" }],
        duration: 1000,
        easing: "easeOutElastic(amplitude, period)",
        direction: "normal",
      });
      setCommbox(true);
    }
  };

  const postData = () => {
    console.log(commentContRef.current);
    return (
      <Card key={post._id} className={classes.card}>
        <div className="post_header">
          <div className="post_avatar">
            <Avatar aria-label="recipe">A</Avatar>
          </div>
          <div className="post_header_username">
            <h4>{post.username}</h4>
            <span>{`Posted ${timeConv(post.createdAt)}`}</span>
          </div>
        </div>
        <div>
          <img
            alt={"postimg"}
            src={`data:image/webp;base64,${toBase64(post.contentimg.data)}`}
          />
        </div>
        <div className="post_content">
          <span>{post.content}</span>
        </div>
        <div className="post_likesComments">
          <button className="post_likebtn">
            <ThumbUpAltIcon />
          </button>
          <button className="post_commentsbtn" onClick={commentExpander}>
            <span>comment</span>
            <span>
              <ExpandMoreIcon />
            </span>
          </button>
        </div>
        <div className="post_comment_container" ref={commentContRef}>
          <h1>SAMPLE</h1>
          <h1>SAMPLE</h1>
          <h1>SAMPLE</h1>
          <h1>SAMPLE</h1>
        </div>
      </Card>
    );
  };

  return post ? postData() : null;
};

export default Postdata;
