import React, { useEffect } from "react";
import { useForm, useField } from "react-final-form-hooks";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import "./login_style.css";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../actions";

const useStyles = makeStyles(() => ({
  btn: {
    backgroundColor: "#E79F4B",
    "&:hover": {
      backgroundColor: "#6D3F0B",
      color: "white",
    },
    width: 450,
    marginTop: 10,
    padding: 10,
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loginerrors = useSelector((state) => state.login.loginerror);
  const loginstats = useSelector((state) => state.login.loginstatus);

  useEffect(() => {
    if (loginstats === "success") {
      dispatch({ type: "LOGIN_RESET" });
      history.push("/homepage");
    }
    // eslint-disable-next-line
  }, [loginstats]);

  const onSubmit = async (values, form) => {
    const email = values.EmailId;
    const password = values.Password;
    // eslint-disable-next-line
    const res = await dispatch(loginUser({ email, password }));
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

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate,
  });

  const EmailId = useField("EmailId", form);
  const Password = useField("Password", form);

  return (
    <div className="login_cont">
      <div className="login_overlay">
        <div className="login_h1_cont">
          <h1 className="login_h1">Please Log In</h1>
          <span className="loginerror">
            {loginerrors !== null ? loginerrors : null}
          </span>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="modalform_inputcont">
              <input
                autoComplete="off"
                placeholder={`Email Id`}
                className="login_inp"
                {...EmailId.input}
              />
              {EmailId.meta.touched && EmailId.meta.error && (
                <span className="newerror">{EmailId.meta.error}</span>
              )}
            </div>
            <div className="modalform_inputcont">
              <input
                type="password"
                autoComplete="off"
                placeholder={`Password`}
                className="login_inp"
                {...Password.input}
              />
              {Password.meta.touched && Password.meta.error && (
                <span className="newerror">{Password.meta.error}</span>
              )}
            </div>

            <Button
              variant="contained"
              type="submit"
              className={classes.btn}
              disabled={submitting}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
