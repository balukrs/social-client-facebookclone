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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="edit_cont">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={classes.root}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h3>Change username</h3>
        </AccordionSummary>
        <AccordionDetails>
          <form className="edit_sub_cont">
            <div>
              <ThemeProvider theme={theme}>
                <TextField
                  id="filled-basic"
                  label="Enter new Username"
                  variant="filled"
                  className={classes.inp}
                  color="secondary"
                />
              </ThemeProvider>
            </div>
            <div>
              <Button variant="contained" type="submit" className={classes.btn}>
                Submit
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
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
          <form className="edit_sub_cont">
            <div>
              <ThemeProvider theme={theme}>
                <TextField
                  id="filled-basic"
                  label="Enter old Password"
                  variant="filled"
                  className={classes.inp}
                  color="secondary"
                />
                <TextField
                  id="filled-basic"
                  label="Enter new Password"
                  variant="filled"
                  className={classes.inp}
                  color="secondary"
                />
              </ThemeProvider>
            </div>
            <div>
              <Button variant="contained" type="submit" className={classes.btn}>
                Submit
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Editprofile;
