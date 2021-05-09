import React, { useState, useEffect, useRef } from "react";
import { useForm, useField } from "react-final-form-hooks";
import { useSelector, useDispatch } from "react-redux";

import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import "./createpost_style.css";

import Createmodal from "./create_modal";

import { postData } from "../../../actions";

const FormData = require("form-data");

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#d69824",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: "#d69824",
    color: "white",
    width: 400,
    padding: 20,
    marginBottom: 20,
    "&:hover": {
      backgroundColor: "#f7a305",
    },
  },

  postbtn: {
    backgroundColor: "#e79f4b",
    color: "black",
    "&:hover": {
      backgroundColor: "#c46d08",
      color: "white",
    },
    marginRight: 10,
  },
}));

const Createpost = () => {
  const classes = useStyles();
  const imageRef = useRef();
  const btnRef = useRef();
  const removeRef = useRef();

  const [modalsts, setModalsts] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(undefined);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userid);

  const modalClose = () => setModalsts(false);

  const fileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      var objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(undefined);
    }
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    if (preview) {
      removeRef.current.style.display = "flex";
    } else {
      removeRef.current.style.display = "none";
    }
  }, [preview]);

  const resizer = () => {
    if (imageRef.current.offsetHeight > 500) {
      imageRef.current.style.height = "400px";
    } else {
      imageRef.current.style.height = "auto";
    }
  };

  const btnClick = () => {
    btnRef.current.click();
  };

  const removePic = () => {
    setFile(null);
    btnRef.current.value = null;
  };

  const closeModal = () => {
    setModalsts(false);
  };

  // Form

  const onSubmit = async (values, form) => {
    const formData = new FormData();
    formData.append("userid", userId);
    formData.append("post", values.Postdetails);
    formData.append("contentupload", file);
    const res = await dispatch(postData(formData));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.Postdetails) {
      errors.Postdetails = "Required";
    }

    return errors;
  };

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate,
  });

  const Postdetails = useField("Postdetails", form);

  return (
    <div>
      <div className="create_btn_container">
        <Button
          className={classes.btn}
          startIcon={<AddIcon />}
          onClick={() => setModalsts(true)}
        >
          Add Post
        </Button>
        <Divider variant="middle" />
      </div>
      <div>
        <Createmodal status={modalsts} close={modalClose}>
          <form className="create_modal_conatiner" onSubmit={handleSubmit}>
            <Paper elevation={3}>
              <div className="create_paper">
                <div>
                  <h1 className="create_heading">Create Post</h1>
                </div>
                <div className="create_text_container">
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      label="Say something...."
                      color="secondary"
                      {...Postdetails.input}
                    />
                    {Postdetails.meta.touched && Postdetails.meta.error && (
                      <span className="newerror">{Postdetails.meta.error}</span>
                    )}
                  </MuiThemeProvider>
                </div>
                <div className="create_upload_cont">
                  <div>
                    <input
                      type="file"
                      onChange={fileChange}
                      className="create_fileupload"
                      ref={btnRef}
                      className="craete_file_input"
                    />
                  </div>
                  <div className="create_btn_upload">
                    <Button variant="contained" onClick={btnClick}>
                      Add Picture
                    </Button>
                  </div>
                </div>
                <div className="create_image_cont">
                  <img
                    src={preview}
                    className="create_img"
                    ref={imageRef}
                    onLoad={resizer}
                  />
                </div>
                <div className="create_submit_cont">
                  <div
                    className="create_remove_btn"
                    ref={removeRef}
                    onClick={removePic}
                  >
                    <Button variant="contained" color="secondary">
                      Remove Picture
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      className={classes.postbtn}
                      disabled={submitting}
                      type="submit"
                    >
                      Post
                    </Button>
                    <Button variant="contained" onClick={closeModal}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </Paper>
          </form>
        </Createmodal>
      </div>
    </div>
  );
};

export default Createpost;
