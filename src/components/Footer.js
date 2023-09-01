import React from "react";
import { Grid, colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  // deal,
  // goal,
  // insta,
  // wiki,
  // fb,
  // twitter,
  // node,
  // w3,
  FooterVector,
} from "../icons";
import "../style.css";
import { grey } from "@material-ui/core/colors";
const styles = makeStyles({
  root: { marginTop: "10%" },
  list: { listStyle: "none" },
  a:{
    color:"grey"
  }
});
function Footer() {
  const classes = styles();
  const links = {
    fb: "https://www.facebook.com/dilip.viswakarma.79",
    insta: "https://www.instagram.com/devd.str/",
    twitter: "https://twitter.com/DilipViswakarm3",
    wikiweb: "https://wikipedia.com",
    w3: "https://w3schools.com",
    js: "https://nodejs.org",
  };
  const leave = (e) => {
    e.target.style.opacity = ".6";
  };
  const enter = (e) => {
    e.target.style.opacity = "1";
  };
  return (
    <div
      style={{ background: "#f7f7f7", textAlign:"center",marginTop: "19%",height:"auto",padding:"5%",display:"flex",alignItems:"center",flexDirection:"column"}}
      className={classes.root}
    >  
       <div style={{marginTop:"5%"}}> 
       
       <h3 variant="h6" style={{ opacity: ".6" }}>
                <span style={{fontSize:"200%",textAlign:"center"}}>Developed By</span>
                Dilip 
              </h3>
              </div>
              <div style={{paddingTop:"3%",display:"flex",flexDirection:"column"}}>
              <a href="https://instagram.com/dilip.ai" style={{color:"grey"}} target="_blank">Instagram</a>
              <a href="https://facebook.com/dilip.ai" style={{color:"grey"}} target="_blank">Facebook</a>
              <a href="https://www.youtube.com/@dilipsuthar7408/" style={{color:"grey"}} target="_blank">Youtube</a>
              <a href="https://github.com/devdilipstr" style={{color:"grey"}} target="_blank">Github</a>
              </div>
              <br/>
              <h5>XENON COPYRIGHT {new Date().getFullYear()}</h5>
    </div>

  );
}
export default Footer;
