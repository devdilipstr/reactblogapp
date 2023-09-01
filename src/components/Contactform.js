import React, { useState } from "react";
import emailjs from "emailjs-com";
import {
  makeStyles,
  Paper,
  TextField,
  Button,
  FormControl,
  TextareaAutosize,
} from "@material-ui/core";
import "../style.css";
const style = makeStyles({
  paper: { maxWidth: "500px", overflow: "hidden" },
  formcontrol: {
    justifyContent: "space-evenly",
    overflowX: "scroll",
    scrollbarColor: "none",
    scrollBehavior: "smooth",
    msScrollbarArrowColor: "none",
    padding: "5%",
    width: "99%",
  },
  text: { border: "0", display: "grid", marginTop: "5%" },
  success: { textAlign: "center", margin: "10%", padding: "10%" },
});
function Contactform() {
  const classes = style();
  const [success, setsuccess] = useState(false);
  const [name, setName] = useState(null);
  const [sub, setSub] = useState(null);
  const [mail, setMail] = useState(null);
  const [message, setMessage] = useState(null);
  if (success === true) {
    setTimeout(() => {
      setsuccess(false);
    }, 4000);
  }
  const send = (e) => {
    e.preventDefault();
    emailjs.send(
      "service_gmmrvgr",
      "template_ndpmtbb",
      {
        name: name,
        message: message,
        mail: mail,
        reply_to: "dilipsuthar74129@gmail.com",
        subject: sub,
      },
      "a8ElFkGYvKukRV13Y"
    );
    document.getElementById("form").reset();
    setsuccess(true);
  };
  return (
    <form onSubmit={send} id="form" style={{ zIndex: "1000" }}>
      <Paper dark>
        
        {success === true ? (
          <div className={classes.success}>
            <h2>We recieved your message.</h2>
            <small>we will contact you as fast as possible.</small>
          </div>
        ) : (
          <FormControl className={classes.formcontrol}>
            <h3>Contact us</h3>
            <TextField
              type="text"
              required
              label="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              label="mail address"
              onChange={(e) => {
                setMail(e.target.value);
              }}
              required
            />
            <TextField
              label="Subject"
              onChange={(e) => {
                setSub(e.target.value);
              }}
              required
            />
            <TextareaAutosize
              className={classes.text}
              placeholder="Enter your message"
              onFocus={(e) => {
                e.target.style.outline = 0;
              }}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              required
            />
            <Button
              type="submit"
              style={{
                background: "#333333",
                color: "white",
                width: "fit-content",
              }}
            >
              send
            </Button>
          </FormControl>
        )}
      </Paper>
    </form>
  );
}

export default Contactform;
