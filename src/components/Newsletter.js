import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../style.css";
import firebase from "./firebase/config";
const styles = makeStyles({
  root: {
    border: "6px solid #f2f2f2",
    backgroundColor: "#f2f2f2",
    width: "300px",
    borderRadius: "30px",
    fontSize: "15px",
    marginBottom: "0",
    marginTop: "20px",
    padding: "1%",
    textAlign: "center",
    zIndex: "100000",
  },
});
function Newsletter({ bcc }) {
  const contact = [];
  const classes = styles();
  const [mail, setmail] = useState(null);
  const [error, seterror] = useState(false);
  const [added, add] = useState(false);
  useEffect(() => {
    const contacts = firebase.database().ref("contacts");
    contacts.on("value", (snap) => {
      let array = snap.val();
      for (let id in array) {
        bcc(array[id]);
        contact.push(array[id]);
      }
    });
  }, [bcc, contact]);
  const Submit = (e) => {
    e.preventDefault();
    if (contact.find((element) => element === mail)) {
      seterror(true);
    } else {
      seterror(false);
      add(true);
      const contacts = firebase.database().ref("contacts");
      contacts.push(mail);
      e.target.reset();
    }
  };
  if (added === true) {
    setTimeout(() => {
      add(false);
    }, 5000);
  }
  return (
    <form onSubmit={Submit}>
      
      <input
        type="email"
        className={classes.root}
        id="inputE"
        onChange={(e) => {
          setmail(e.target.value);
        }}
        placeholder="Subscribe to our newsletter"
      />
      <br></br>
      {error === true ? (
        <small>This email already exist ,try with other one</small>
      ) : (
        <></>
      )}
      {added === true ? (
        <small>your Subscription is added to our newsletter.</small>
      ) : (
        <></>
      )}
    </form>
  );
}
export default Newsletter;
