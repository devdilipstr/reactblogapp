import React,{useEffect} from "react";
import { Grid } from "@material-ui/core";
import { About1 } from "../icons";
function About() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <Grid container xs="12" style={{ justifyContent: "center" }} spacing={2}>
      
      <Grid
        container
        xs="12"
        style={{
          backgroundColor: "#333333",
          padding: "10%",
          color: "white",
          position: "realative",
          overflow: "hidden",
        }}
      >
        
        <Grid
          xs="5"
          md="5"
          style={{ display: "grid", justifyContent: "center" }}
        >
          
          <img
            alt=""
            src={About1}
            style={{ position: "absolute", opacity: ".2" }}
          />
        </Grid>
        <Grid
          xs="10"
          md="5"
          justify="center"
          style={{ display: "grid", justifyContent: "center" }}
        >
          
          <p>
            
            <h1>Our Services</h1> <li>IT solutions</li> <li>Web Development</li>
            <li>Logo Design</li> <li>Software Development</li>
            <li>Hardware software</li> <li>QR Designing</li> <li>Blogs</li>
            <li>Free tutorials</li> <p>Contact us for further convience</p>
          </p>
        </Grid>
      </Grid>
      <Grid
        container
        xs="12"
        style={{ backgroundColor: "#2F8E95", padding: "10%" }}
      >
        
        <Grid
          xs="10"
          md="5"
          style={{ display: "flex", justifyContent: "center" }}
        >
          
          <p>
            
            Xenon is a branding name we use to all our projects.There is a long
            story behind it.We are a small community aimed for provide help
            regarding IT. Other business solutions of logo and bill desgin ,QR
            generation and much more. For more give your question in contact us
            form.
          </p>
        </Grid>
      </Grid>
      <Grid
        container
        xs="12"
        style={{ backgroundColor: "#333333", padding: "10%", color: "white" }}
      >
        
        <Grid
          xs="12"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          
          <h1>Call us</h1> <br></br> <h1>+919351856256</h1>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default About;
