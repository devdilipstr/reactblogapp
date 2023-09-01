import React, { useState } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import firebase from "./firebase/config";
function SecureInForm({ panel, username, previlage, num }) {
  const [number, setNumber] = useState(null);
  const [submitOTP, setOTP] = useState(null);
  const [New, setNew] = useState(false);
  const [code, setcode] = useState(null);
  const [error, seterror] = useState(false);
  const [name, setName] = useState();
  const users = [];
  const usrs = firebase.database().ref("users");
  usrs.on("value", (phone) => {
    phone.forEach((id) => {
      users.push(id.val());
    });
  });
  console.log(users);
  const sendOTP = () => {
    console.log(number.length);
    if (number.length === 13) {
      seterror(false);
      if (users === null) {
        console.log("null");
      } else if (users.find((element) => element.mobile === number)) {
        console.log("matched");
      } else {
        setNew(true);
      }
      let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
      firebase
        .auth()
        .signInWithPhoneNumber(number, recaptcha)
        .then((e) => {
          setOTP(e);
          console.log(e);
          console.log("hello")
        });
    } else {
      seterror(true);
    }
  };
  const newUser = (name, mobile) => {
    const detail = { name, mobile, previlage: false };
    usrs.push(detail);
  };
  const verify = () => {
    if (code.length === 6) {
      console.log(code);
      submitOTP.confirm(code).then((result) => {
        if (New === true) {
          newUser(name, result.user.phoneNumber);
          let sortDetail = users.find((element) => element.mobile === number);
          setNew(false);
          username(sortDetail.name);
          previlage(sortDetail.previlage);
          num(sortDetail.mobile);
        } else {
          console.log("certain");
          let sortDetail = users.find((element) => element.mobile === number);
          username(sortDetail.name);
          previlage(sortDetail.previlage);
          num(sortDetail.mobile);
        }
        panel(true);
        seterror(false);
      });
    } else {
      seterror(true);
    }
  };
  return (
    <FormControl style={{ transition: "all ease-in-out .3s" }}>
      
      {submitOTP === null ? (
        <>
          
          <TextField
            id="filled-number"
            style={{ borderBottom: "" }}
            type="number"
            error={error}
            placeholder="Enter Mobile Number"
            onChange={(e) => {
              setNumber("+" + e.target.value);
            }}
          />
          <br></br> <div id="recaptcha"></div>
          <Button
            variant="contained"
            onClick={sendOTP}
            style={{ background: "#333333", color: "white" }}
          >
            
            Initiate verification
          </Button>
        </>
      ) : (
        <></>
      )}
      {submitOTP != null ? (
        <>
          
          <TextField
            id="code"
            type="number"
            error={error}
            onChange={(e) => {
              setcode(e.target.value);
            }}
            style={{ marginBottom: "5%" }}
            placeholder="Enter OTP"
          />
          {New === true ? (
            <>
              
              <TextField
                id="name"
                type="text"
                placeholder="Enter User Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </>
          ) : (
            <></>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={verify}
            style={{ background: "#333333", color: "white" }}
          >
            
            verify
          </Button>
        </>
      ) : (
        <></>
      )}
    </FormControl>
  );
}
export default SecureInForm;
