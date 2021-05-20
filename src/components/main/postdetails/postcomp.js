import React, { useState, useEffect } from "react";
import Api from "../../../api/social";

import moment from "moment";
import { Collapse } from "react-collapse";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Commentbox from "./postcomment";

import { useSelector } from "react-redux";

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

const Postdata = ({ id }) => {
  const classes = useStyles();

  const [post, setPost] = useState(null);
  const [commbox, setCommbox] = useState(false);
  const [userImg, setUserimg] = useState(null);
  const [likelen, setLikelen] = useState(null);
  const [likestats, setLikestats] = useState("action");

  const currentID = useSelector((state) => state.user.userid);

  const dataFetch = async (ID) => {
    const response = await Api.get(`/post/${ID}`);
    setPost(response.data);
  };

  const imageFetch = async (userid) => {
    const response = await Api.get(`/profilepic/${userid}`);
    const Profileimg = response.data.img
      ? await toBase64(response.data.img.data)
      : null;
    setUserimg(Profileimg);
  };

  const likeFetch = async () => {
    const response = await Api.post(`/likes/${currentID}/${id}`);
    setLikelen(response.data.likes);
    if (response.data.likestatus === "added") {
      setLikestats("primary");
    } else if (response.data.likestatus === "removed") {
      setLikestats("error");
    }
  };

  useEffect(() => {
    if (id) {
      dataFetch(id);
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      imageFetch(post.userid);
      setLikelen(post.likes.length);
    }
  }, [post]);

  const postData = () => {
    return (
      <Card key={post._id} className={classes.card}>
        <div className="post_header">
          <div className="post_avatar">
            <Avatar
              alt="Travis Howard"
              src={`data:image/webp;base64,${userImg}`}
            />
          </div>
          <div className="post_header_username">
            <h4>{post.username}</h4>
            <span>{`Posted ${timeConv(post.createdAt)}`}</span>
          </div>
        </div>
        <div>
          {post.contentimg ? (
            <img
              alt={"postimg"}
              src={`data:image/webp;base64,${toBase64(post.contentimg.data)}`}
            />
          ) : null}
        </div>
        <div className="post_content">
          <span>{post.content}</span>
        </div>
        <div className="post_likesComments">
          <div className="post_like_cont">
            <button className="post_likebtn" onClick={() => likeFetch()}>
              <ThumbUpAltIcon color={likestats} />
            </button>
            <span>{likelen}</span>
          </div>

          <button
            className="post_commentsbtn"
            onClick={() => setCommbox(!commbox)}
          >
            <span>comment</span>
            <span>{commbox ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
          </button>
        </div>
        <div className="post_comment_container">
          <Collapse isOpened={commbox}>
            <Commentbox comm={post.comments} id={post._id} />
          </Collapse>
        </div>
      </Card>
    );
  };

  return post ? postData() : null;
};

export default Postdata;
