import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginTop: 5,
    borderRadius: 5,
    boxShadow: "1px 2px 3px black",
  },
  btn: {
    backgroundColor: "#f56042",
    "&:hover": {
      backgroundColor: "#f23b16",
      color: "white",
    },
  },
}));

const Api = Axios.create({
  baseURL: "http://localhost:5000/social",
});

function toBase64(arr) {
  arr = new Uint8Array(arr);
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
}

const Deletepost = () => {
  const classes = useStyles();
  const [postdata, setPostdata] = useState(null);
  const [open, setOpen] = useState(false);

  const userid = useSelector((state) => state.user.userid);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    postFetch();
  };

  const postFetch = async () => {
    const posts = await Api.get(`/userpost/${userid}`);
    setPostdata(posts.data);
  };

  useEffect(() => {
    if (userid) {
      postFetch();
    }
    // eslint-disable-next-line
  }, [userid]);

  const delPost = async (id) => {
    const response = await Api.delete(`/post/${id}`);
    if (response.data === "deleted") {
      setOpen(true);
    }
  };

  const postDetails = () => {
    if (!postdata) {
      return null;
    }

    return postdata.map((post, index) => {
      return (
        <div key={index} className="delete_post">
          <div>
            <h4>{post.content}</h4>
            {post.contentimg ? (
              <Avatar
                className={classes.large}
                variant="square"
                src={`data:image/webp;base64,${toBase64(post.contentimg.data)}`}
              ></Avatar>
            ) : null}
          </div>
          <div>
            <Button
              size="small"
              className={classes.btn}
              onClick={() => delPost(post._id)}
            >
              Delete
            </Button>
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            message="Post Deleted"
          />
        </div>
      );
    });
  };

  return <div className="delete_cont">{postDetails()}</div>;
};

export default Deletepost;
