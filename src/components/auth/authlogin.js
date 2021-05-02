import React, { useState } from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Logo from "../../pictures/motivation.png";
import { useForm, useField } from "react-final-form-hooks";

import Modals from "./modal/modal";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10.5,
    backgroundColor: "#E79F4B",
    marginLeft: 5,
    "&:hover": {
      backgroundColor: "#6D3F0B",
      color: "white",
    },
    display: " block",
    height: 45,
  },
  signin: {
    backgroundColor: "#E79F4B",
    "&:hover": {
      backgroundColor: "#6D3F0B",
      color: "white",
    },
    width: 300,
    marginBottom: 10,
    padding: 10,
  },
  login: {
    borderColor: "#E79F4B",
    color: "#E79F4B",
    "&:hover": {
      borderColor: "#6D3F0B",
      color: "#6D3F0B",
    },
    width: 300,
    padding: 10,
  },
}));

const onSubmit = (values, form) => {
  console.log(values);
  form.restart();
};
const validate = (values) => {
  const errors = {};
  if (!values.EmailId) {
    errors.EmailId = "Required";
  }
  if (!values.Password) {
    errors.Password = "Required";
  }
  return errors;
};

const Authlogin = () => {
  const { form, handleSubmit } = useForm({
    onSubmit,
    validate,
  });

  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  const modalClick = (val) => {
    if (val === "login") {
      setLogin(true);
      setSignup(false);
    } else {
      setLogin(true);
      setSignup(false);
    }
  };

  const modalClose = () => {
    setLogin(false);
    setSignup(false);
  };

  const EmailId = useField("EmailId", form);
  const Password = useField("Password", form);

  const classes = useStyles();

  return (
    <div className="mainlog_cont">
      <div className="mainlog_pic"></div>
      <div className="mainlog_log">
        <div className="inp_cont">
          <form onSubmit={handleSubmit} className="mailog_form">
            <div className="form_inputcont">
              <input
                autoComplete="off"
                placeholder={`Email ID`}
                className="mailog_inp"
                {...EmailId.input}
              />
              {EmailId.meta.touched && EmailId.meta.error && (
                <span className="error">{EmailId.meta.error}</span>
              )}
            </div>
            <div className="form_inputcont">
              <input
                autoComplete="off"
                placeholder={`Password`}
                className="mailog_inp"
                {...Password.input}
              />
              {Password.meta.touched && Password.meta.error && (
                <span className="error">{Password.meta.error}</span>
              )}
            </div>

            <Button variant="contained" className={classes.root} type="submit">
              Log In
            </Button>
          </form>
        </div>
        <div className="mainlog_adverstise">
          <div className="mainlog_adv">
            <img src={Logo} className="mainlog_logo" alt="logo" />
          </div>
          <div className="mainlog_adv">
            <h1 className="mainlog_h1">Connecting Now</h1>
          </div>
          <div className="mainlog_adv">
            <h2 className="mainlog_h2">Join Social App today.</h2>
          </div>
        </div>
        <div className="button_cont">
          <Button
            variant="contained"
            className={classes.signin}
            onClick={() => modalClick("signup")}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            className={classes.login}
            onClick={() => modalClick("login")}
          >
            Log In
          </Button>
        </div>
      </div>
      <div>
        <Modals signup={signup} login={login} close={modalClose} />
      </div>
    </div>
  );
};

export default Authlogin;
