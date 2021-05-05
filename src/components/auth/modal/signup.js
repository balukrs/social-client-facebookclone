import React from "react";
import { useForm, useField } from "react-final-form-hooks";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { registerUser } from "../../../actions";

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

const SignUp = ({ load }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = (values, form) => {
    load();
    const username = values.Username;
    const email = values.EmailId;
    const password = values.Password;

    const formValues = {
      username,
      email,
      password,
    };

    dispatch(registerUser(formValues));
    form.restart();
  };

  const validate = (values) => {
    const errors = {};
    if (!values.Username) {
      errors.Username = "Required";
    }
    if (!values.EmailId) {
      errors.EmailId = "Required";
    }
    if (!values.Password) {
      errors.Password = "Required";
    }
    if (values.Password !== values.ConfirmPassword) {
      errors.ConfirmPassword = "Passwords dont match";
    }
    return errors;
  };

  const { form, handleSubmit } = useForm({
    onSubmit,
    validate,
  });

  const Username = useField("Username", form);
  const EmailId = useField("EmailId", form);
  const Password = useField("Password", form);
  const ConfirmPassword = useField("ConfirmPassword", form);

  return (
    <div className="signup_cont">
      <div className="signup_h1_cont">
        <h1 className="signup_h1">Create your account</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="modalform_inputcont">
            <input
              autoComplete="off"
              placeholder={`Username`}
              className="signup_inp"
              {...Username.input}
            />
            {Username.meta.touched && Username.meta.error && (
              <span className="newerror">{Username.meta.error}</span>
            )}
          </div>
          <div className="modalform_inputcont">
            <input
              autoComplete="off"
              placeholder={`Email Id`}
              className="signup_inp"
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
              placeholder={`Password (Min 8 characters required)`}
              className="signup_inp"
              {...Password.input}
            />
            {Password.meta.touched && Password.meta.error && (
              <span className="newerror">{Password.meta.error}</span>
            )}
          </div>
          <div className="modalform_inputcont">
            <input
              type="password"
              autoComplete="off"
              placeholder={`Confirm Password`}
              className="signup_inp"
              {...ConfirmPassword.input}
            />
            {ConfirmPassword.meta.touched && ConfirmPassword.meta.error && (
              <span className="newerror">{ConfirmPassword.meta.error}</span>
            )}
          </div>
          <Button variant="contained" type="submit" className={classes.btn}>
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
