import React from "react";
import { Grid, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
function Blogpop({
  heading,
  category,
  time,
  thumb,
  id
}) {
  var link =  "/blog?b=" +id;


  return (
    <div
      style={{ background: "#f2f2f2", border: "solid #F7F7F7", height: "fit",borderRadius:"20px",width:"250px"}}
    >
      
      <Grid item xs="12">
        
        <img
          alt=""
          src={thumb}
          style={{ width: "100%",borderRadius:"20px"}}
          
        />
      </Grid>
      <Grid item xs="12" style={{ height: "100%", padding: "3%" }}>
        
        <h1>{heading}</h1>
        <small style={{ padding: "0", opacity: ".6" }}>{category}</small>
        <br></br> <small style={{ padding: "0", opacity: ".6" }}>{time}</small>
        <br />
        <NavLink to={link} exact>
          
          <Button 
            >
              <ChromeReaderModeIcon />
          </Button>
        </NavLink>
      </Grid>
    </div>
  );
}
export default Blogpop;
