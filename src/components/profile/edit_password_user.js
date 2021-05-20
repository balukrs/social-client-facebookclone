import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Snackbar from "@material-ui/core/Snackbar";

import { useSelector, useDispatch } from "react-redux";
import { userDiscard } from "../../actions";
import Api from "../../api/social";

const theme = createMuiTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: "#c46d06",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: 550,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  btn: {
    width: 100,
    padding: 8,
    "&:hover": {
      backgroundColor: "#c46d06",
    },
  },
  inp: {
    width: 400,
    marginBottom: 10,
  },
}));

const Editprofile = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [oldval, setOldval] = useState("");
  const [newval, setNewval] = useState("");
  const [open, setOpen] = useState(false);
  const [btnstats, setBtnstats] = useState(false);
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const userid = useSelector((state) => state.user.userid);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setBtnstats(false);
  };

  const passPost = async (formdata) => {
    const response = await Api.post("/editpassword", formdata);
    if (response.data.details) {
      setMsg(response.data.details[0].message);
      setOpen(true);
    } else if (response.data.error) {
      setMsg(response.data.error);
      setOpen(true);
    } else if (response.data === "updated") {
      setMsg("password updated");
      setOpen(true);
      dispatch(userDiscard());
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    setBtnstats(true);
    if (!oldval || !newval) {
      setMsg("Feilds cannot be empty");
      setOpen(true);
      return;
    }
    const formdata = {
      oldpassword: oldval,
      password: newval,
      userid: userid,
    };
    passPost(formdata);
  };

  return (
    <div className="edit_cont">
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        className={classes.root}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h3>Change password</h3>
        </AccordionSummary>
        <AccordionDetails>
          <form className="edit_sub_cont" onSubmit={(e) => submitForm(e)}>
            <div>
              <ThemeProvider theme={theme}>
                <TextField
                  id="filled-basic"
                  label="Enter old Password"
                  variant="filled"
                  className={classes.inp}
                  color="secondary"
                  value={oldval}
                  onChange={(e) => setOldval(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="Enter new Password"
                  variant="filled"
                  className={classes.inp}
                  color="secondary"
                  value={newval}
                  onChange={(e) => setNewval(e.target.value)}
                />
              </ThemeProvider>
            </div>
            <div>
              <Button
                variant="contained"
                type="submit"
                className={classes.btn}
                disabled={btnstats}
              >
                Submit
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={msg}
      />
    </div>
  );
};

export default Editprofile;
