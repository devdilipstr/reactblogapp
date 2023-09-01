import React,{useEffect} from "react";
import { secure } from "../icons/";
import { Grid, makeStyles } from "@material-ui/core";
import SecureInForm from "./SecureInForm";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
const styles = makeStyles({
  svg: { width: "100%" },
  item: { alignItems: "center" },
});
function SecureIn({ panel, username, previlage, num }) {
  const classes = styles();
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <Grid container justify="center" spacing={8}>
      
      <Grid item xs="10" justify="center" style={{ display: "flex" }}>
        
        <VpnKeyIcon /> <h1>SecureIn with us</h1>
      </Grid>
      <Grid
        container
        xs="12"
        justify="center"
        spacing={4}
        className={classes.item}
      >
        
        <Grid item xs="6" md="5">
          
          <img alt="" src={secure} className={classes.svg} />
        </Grid>
        <Grid
          item
          xs="12"
          md="5"
          justify="center"
          style={{ display: "flex", padding: "5%" }}
        >
          
          <SecureInForm
            panel={panel}
            username={username}
            previlage={previlage}
            num={num}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default SecureIn;
