import React, { useState ,useEffect} from "react";
import { Grid, makeStyles, Button } from "@material-ui/core";
import firebase from "./firebase/config";
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
function Blog() {

  const queryParameters = new URLSearchParams(window.location.search)
  const b = queryParameters.get("b")
  
  var [blog,setBlog]= useState({});
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  useEffect(() => {
    let blogs = firebase.database().ref("blogs");
    blogs.on("value", (snapshot) => {
      let array = snapshot.val();
      setBlog(array[b])
    });
  })

  const classes = styles();
  const [see, setsee] = useState(false);
  const saw = () => {
    var blogdiv = document.getElementById("blogdiv");
    blogdiv.innerHTML = blog.text;
    setsee(true);
  };
  const close = () => {
    setsee(false);
    var blogdiv = document.getElementById("blogdiv");
    blogdiv.innerHTML = "";
  };
  return (
    <Grid container xs="12" className={classes.root}>
      
      <Grid item xs="10" className={classes.heading}>
        
        <h1>
          
          {blog.title}
        </h1>
        <h4>{blog.category}</h4> <br></br>
        <small style={{ padding: "0", opacity: ".6" }}>{blog.time}</small>
      </Grid>
      <Grid item xs="10" className={classes.heading}>
        <br/>
        <img alt="" className="banner" src={blog.thumb} />
      </Grid>
      <Grid item xs="10" style={{ paddingTop: "5%" }}>
        
        {see === false ? (
          <Button onClick={saw}>Read it</Button>
        ) : (
          <Button onClick={close}>close</Button>
        )}
        <div id="blogdiv"></div>
      </Grid>
    </Grid>
  );
}
export default Blog;
