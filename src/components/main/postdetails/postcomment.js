import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

import moment from "moment";
import Axios from "axios";

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  btn: {
    backgroundColor: "#7a7977",
    "&:hover": {
      backgroundColor: "#b57326",
    },
  },
  loader: {},
}));

function timeConv(data) {
  const time = moment(data);
  return time.calendar();
}

const Api = Axios.create({
  baseURL: "https://socialapp-back.herokuapp.com/social",
});

const Commentbox = ({ comm, id }) => {
  const classes = useStyles();

  const [textval, setTextval] = useState("");
  const [btnstats, setBtnstats] = useState(false);
  const [commen, setCommen] = useState([]);
  const [el, setEl] = useState(null);

  const userName = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.userid);

  useEffect(() => {
    if (comm) {
      setCommen(comm);
    }
  }, [comm]);

  useEffect(() => {
    if (commen) {
      resultfunc();
    }
    // eslint-disable-next-line
  }, [commen]);

  const commentPost = async (formvalue) => {
    const response = await Api.post("/comments", formvalue);
    if (response.data) {
      setCommen(response.data.comments);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnstats(true);
    if (!textval.length) {
      return;
    }
    const formvalue = {
      id: id,
      comment: {
        username: userName,
        userid: userId,
        content: textval,
      },
    };
    commentPost(formvalue);
  };

  function toBase64(arr) {
    arr = new Uint8Array(arr);
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }

  const imageFetch = async (userid) => {
    const response = await Api.get(`/profilepic/${userid}`);
    const Profileimg = response.data.img
      ? await toBase64(response.data.img.data)
      : "";
    return Profileimg;
  };

  const commData = async () => {
    if (!commen.length) {
      return null;
    }

    return await Promise.all(
      commen.map(async (comment, index) => {
        const imagedata = await imageFetch(comment.userid);

        return (
          <div className="comment_post" key={index}>
            <div className="comment_avatar">
              <Avatar
                variant="square"
                className={classes.small}
                src={`data:image/webp;base64,${imagedata}`}
              ></Avatar>
            </div>
            <div className="comment_body">
              <div>
                <span className="comment_user">{comment.username}</span>
                <span className="comment_time">
                  {timeConv(comment.createdAt)}
                </span>
              </div>
              <div>
                <span className="comment_content">{comment.content}</span>
              </div>
            </div>
          </div>
        );
      })
    );
  };

  const resultfunc = async () => {
    const result = await commData();
    setBtnstats(false);
    setTextval("");
    setEl(result);
  };

  return (
    <div className="comment_cont">
      <header className="comment_header">
        <h3>Comments</h3>
      </header>
      {el}
      <footer className="comment_reply">
        <form className="comment_form" onSubmit={handleSubmit}>
          <textarea
            rows="4"
            cols="30"
            placeholder="Add Comments"
            value={textval}
            onChange={(e) => setTextval(e.target.value)}
          ></textarea>
          <Button
            size="small"
            className={classes.btn}
            type="submit"
            disabled={btnstats}
          >
            Reply
          </Button>
        </form>
        {!btnstats ? null : (
          <div className="comment_loading">
            <p>Loading</p>
            <LinearProgress className={classes.loader} />
          </div>
        )}
      </footer>
    </div>
  );
};

export default Commentbox;
