import React, { useState } from "react";
import { Drawer, Button, TextField } from "@material-ui/core";
import "../style.css";
import firebase from "./firebase/config";
function Dside({ open, Close, fdoddle,setstatus }) {
  const [doddle, updatedoddle] = useState(null);
  const [head, updatehead] = useState(null);
  const [tag, updatetag] = useState(null);
  const uploaddoddle = () => {
    let text = document.getElementById("doddle");
    text.textContent = "";
    console.log(doddle);
    const sendDoodle = firebase.database().ref("doddle");
    const doddleimg = {doddle,head,tag};
    sendDoodle.set(doddleimg);
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={Close}
      style={{ zIndex: "1000" }}
    >
      
      <div
        style={{
          marginTop: "15vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
        <div style={{ width: "400px", height: "250px", overflow: "hidden" }}>
          
          {fdoddle && (
            <img
              alt=""
              src={fdoddle}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50%",
          }}
        >
          
          <TextField
            label="New Doddle"
            id="doddle"
            onChange={(e) => {
              updatedoddle(e.target.value);
            }}
          />
          <TextField
            label="New Headline"
            id="doddle"
            onChange={(e) => {
              updatehead(e.target.value);
            }}
          />
          <TextField
            label="New Tagline"
            id="doddle"
            onChange={(e) => {
              updatetag(e.target.value);
            }}
          />
          <Button onClick={uploaddoddle}>Set</Button>
           <br/>
          <Button onClick={()=>{setstatus(!open)}}>Close</Button>
        </div>
      </div>
    </Drawer>
  );
}
export default Dside;
