import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const modalEl = document.getElementById("modal-root");

const Createmodal = (props) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (props.status === true) {
      handleOpen();
    }
    if (props.status === false) {
      handleClose();
    }
    // eslint-disable-next-line
  }, [props.status]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.close();
  };

  return createPortal(open ? <div>{props.children}</div> : null, modalEl);
};

export default Createmodal;
