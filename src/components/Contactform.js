import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  TextField,
  Button,
  FormControl,
  TextareaAutosize,
} from "@material-ui/core";
import "../style.css";
import { contactService } from "../services";

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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    try {
      const response = await contactService.submit({
        name,
        email,
        subject,
        message,
      });
      
      if (response.success) {
        setSuccess(true);
        // Reset form after 4 seconds
        setTimeout(() => {
          setSuccess(false);
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        }, 4000);
      }
    } catch (error) {
      alert("Error sending message: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ zIndex: "1000", minWidth:"300px"}}>
      <Paper dark>
        {success ? (
          <div className={classes.success}>
            <h2>We received your message.</h2>
            <small>We will contact you as fast as possible.</small>
          </div>
        ) : (
          <FormControl className={classes.formcontrol}>
            <h3>Contact us</h3>
            <TextField
              type="text"
              required
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <TextField
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              label="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={loading}
            />
            <TextareaAutosize
              className={classes.text}
              placeholder="Enter your message"
              minRows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              onFocus={(e) => {
                e.target.style.outline = 0;
              }}
            />
            <Button
              type="submit"
              disabled={loading}
              style={{
                background: "#333333",
                color: "white",
                width: "fit-content",
              }}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </FormControl>
        )}
      </Paper>
    </form>
  );
}

export default Contactform;
