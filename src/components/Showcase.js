import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Newsletter from "./Newsletter";
import "../style.css";
import { motion } from "framer-motion";
const styles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justify: "center",
    height: "auto",
  },
});
const Showcase = ({ img, heading, tag, bcc }) => {
  const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };
  const classes = styles();
  return (
    <motion.div variants={item} style={{ transition: "ease-in-out 10s" }}>
      
      <Grid container xs="12" justify="center" className={classes.root}>
        
        <Grid
          item
          xs="12"
          md="6"
          justify="center"
          style={{ display: "flex", opacity: ".9" }}
        >
          
          <img alt="" src={img} className="banner" />
        </Grid>
        <Grid item xs="12" style={{ textAlign: "center" ,marginBottom:"20px"}}>
          
          <h1 style={{ fontSize: "50px", fontWeight: "bold",lineHeight:"65px",marginTop:"5px",overflow:"hidden"}}>
            {heading}
          </h1>
          <p style={{ marginLeft: "11px",fontSize:"20px",color:"grey" }}>{tag}</p> <Newsletter bcc={bcc} />
        </Grid>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "0" }}
        ></div>
      </Grid>
    </motion.div>
  );
};
export default Showcase;
