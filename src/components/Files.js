import React, { useState, useEffect } from "react";
import firebase from "./firebase/config";
import { Grid, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "../style.css";
const styles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    background: "#f2f2f2",
    minHeight: "400px",
    flexDirection: "column",
    width: "400px",
    padding: "10%",
  },
});
function Files() {
  const classes = styles();
  const [progress, setprogress] = useState(null);
  const [url, seturl] = useState(null);
  const [file, setfile] = useState(null);
  useEffect(() => {
    if (file != null) {
      const storageref = firebase.storage().ref(file.name);
      storageref.put(file).on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setprogress(percentage);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const url = await storageref.getDownloadURL();
          seturl(url);
          setprogress(null);
          setfile(null);
        }
      );
    }
  }, [file]);
  return (
    <Grid container xs="12" md="8" justify="center" className={classes.root}>
      
      <Grid xs="2" justify="center" style={{ margin: "auto" }}>
        
        <label
          style={{
            background: "#0002",
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            padding: "3%",
            borderRadius: "100%",
          }}
        >
          
          <AddIcon />
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              setfile(e.target.files[0]);
            }}
          />
        </label>
      </Grid>
      <Grid xs="11">
        
        {file && <p>{file.name}</p>}
        {progress && (
          <div
            style={{
              borderRadius: "10px",
              height: "5px",
              width: { progress },
              background: "grey",
              transition: "ease-in-out .3s all",
            }}
          ></div>
        )}
      </Grid>
      <Grid xs="12" style={{ display: "flex", overflowX: "scroll" }}>
        
        {url && <p style={{ transition: "ease-in-out .3s all" }}>{url}</p>}
      </Grid>
      <p style={{ opacity: 0.1, textAlign: "center" }}>upload and copy link.</p>
    </Grid>
  );
}
export default Files;
