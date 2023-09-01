import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Contactform from "./Contactform";
import Contactdetail from "./Contactdetail";
const style = makeStyles({
  root: { display: "flex" },
  child: { display: "Grid", justifyContent: "center", alignItems: "center" },
});
function contact() {
  const classes = style();
  
  
  
  return (
    <Grid container xs="12" justify="center" className={classes.root}>
      <Grid item xs="12" md="7" className={classes.child}>
        <Contactform />
      </Grid>
      <Grid item xs="12" md="3" className={classes.child}>
        
        <Contactdetail />
      </Grid>
    </Grid>
  );
}
export default contact;
