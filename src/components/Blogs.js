import React, { useState,useEffect } from "react";
import { Grid, makeStyles, Button } from "@material-ui/core";
import {Blogpop} from "../components"
import "../style.css";
const styles = makeStyles({
  root: { justifyContent: "center" },
  heading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  gap: { paddingTop: "5%" },
});
function Blogs({blogs}) {
  
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);


  return <div id="hello">
  <Grid
    item
    xs="12"
    style={{
      display: "flex",
      padding: "5%",
      justifyContent: "center",
      
    }}
  >
    
    <h1>Blogs</h1>
  </Grid>
  <Grid
    container
    md="10"
    xs="12"
    
    spacing={3}
    style={{ display: "flex"}}
  >
    
    {blogs != null ? 
     
      Object.keys(blogs).reverse().map(function(keyName, keyIndex){
        let i = blogs[keyName];
        return <Grid item xs="12" md="4" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            
              <Blogpop
              heading={i.title}
              category={i.category}
              time={i.time}
              thumb={i.thumb}
              id={keyName}
              />
        
        </Grid>
        
      }
      
    ) : (
      <h1>loading</h1>
    )}
  </Grid>
  </div>
}
export default Blogs;
