import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./modal_style.css";

import SignUp from "./signup";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(94, 94, 94, 0.59)",
  },
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
  loader: {
    color: "#E79F4B",
  },
}));

const Modals = ({ signup, login, close }) => {
  const classes = useStyles();
  const history = useHistory();
  const registerstats = useSelector((state) => state.register.registerstatus);
  const registermsg = useSelector((state) => state.register.registererror);

  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState("signup");

  useEffect(() => {
    if (signup) {
      setOpen(true);
      setLoad("signup");
    }
    if (login) {
      history.push(`/login`);
    }
    // eslint-disable-next-line
  }, [signup, login]);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  const loaderFunc = () => {
    setLoad("loader");
  };

  const Snacks = () => {
    const [loadstate, setLoadstate] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
      if (registerstats === "success") {
        setMessage("Registration Successful");
        setLoadstate(true);
        setTimeout(function () {
          setLoad("signup");
          history.push(`/login`);
        }, 3000);
      }
      if (registerstats === "failed") {
        setMessage(registermsg);
        setLoadstate(true);
        setTimeout(function () {
          setLoad("signup");
        }, 3000);
      }
      // eslint-disable-next-line
    }, [registerstats]);

    const Loading = () => {
      return (
        <div>
          <CircularProgress className={classes.loader} />
        </div>
      );
    };
    const Loaded = () => {
      return (
        <div>
          <h1 className="modal_loaded">{message}</h1>
        </div>
      );
    };
    return loadstate ? <Loaded /> : <Loading />;
  };

  const modalFunc = () => {
    if (load === "signup") {
      return (
        <div className="modal_cont">
          <SignUp load={loaderFunc} />
        </div>
      );
    } else if (load === "loader") {
      return (
        <div>
          <Snacks />
        </div>
      );
    }
  };

  return (
    <div>
      <Modal onClose={handleClose} open={open} className={classes.modal}>
        {modalFunc()}
      </Modal>
    </div>
  );
};

export default Modals;
