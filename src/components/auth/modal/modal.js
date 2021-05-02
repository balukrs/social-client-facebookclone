import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { useForm, useField } from "react-final-form-hooks";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./modal_style.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(94, 94, 94, 0.59)",
  },
}));

const Modals = ({ signup, login, close }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (signup || login) {
      setOpen(true);
    }
  }, [signup, login]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    close();
  };

  const onSubmit = (values, form) => {
    console.log(values);
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
    return errors;
  };

  const SignUp = () => {
    const { form, handleSubmit } = useForm({
      onSubmit,
      validate,
    });

    const Username = useField("Username", form);
    const EmailId = useField("EmailId", form);
    const Password = useField("Password", form);

    return (
      <div>
        <div>
          <h1 className="signup_h1">Create your account</h1>
        </div>
        <div>
          <form>
            <div className="form_inputcont">
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
            <div className="form_inputcont">
              <input
                autoComplete="off"
                placeholder={`EmailId`}
                className="signup_inp"
                {...EmailId.input}
              />
              {EmailId.meta.touched && EmailId.meta.error && (
                <span className="newerror">{EmailId.meta.error}</span>
              )}
            </div>
            <div className="form_inputcont">
              <input
                autoComplete="off"
                placeholder={`Password`}
                className="signup_inp"
                {...Password.input}
              />
              {Password.meta.touched && Password.meta.error && (
                <span className="newerror">{Password.meta.error}</span>
              )}
            </div>
            <Button variant="contained" type="submit">
              Create Account
            </Button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Modal onClose={handleClose} open={open} className={classes.modal}>
      <div className="modal_cont">{SignUp()}</div>
    </Modal>
  );
};

export default Modals;
