import React from "react";
import { blogVector } from "../icons";
import { Grid } from "@material-ui/core";
import "../style.css";
function BlogIntro() {
  return (
    <Grid
      container
      spacing={1}
      justify="center"
      style={{
        marginTop: "10%",
        padding: "10%",
        background: "#333333",
        color: "white",
        
        
      }}
    >
      
      
      <Grid item xs="12" md="12">
        
        <p>
          
        Greetings, tech aficionados and innovation enthusiasts! I am thrilled to extend a warm virtual handshake and open the digital doors to my world of all things tech and groundbreaking advancements. I am Dilip Suthar, your host and guide on this exciting journey into the ever-evolving realm of technology.

In a world that is rapidly propelled by technological breakthroughs and innovations, staying up-to-date and engaged with the latest trends is not just an option; it's a thrilling adventure. From the humble beginnings of the internet to the dazzling prospects of artificial intelligence, we find ourselves amidst an era that promises to redefine the way we live, work, and interact
        </p>
      </Grid>
    </Grid>
  );
}
export default BlogIntro;
