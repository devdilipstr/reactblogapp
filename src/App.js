/*dependency imports */ import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "./components/firebase/config";
import { loading } from "./icons";
import Contact from "./components/Contact";
import About from "./components/About";
/*componets imports */ import {
  Nav,
  BlogIntro,
  Showcase,
  Blogpop,
  Footer,
  Blog,
  SecureIn,
  Panel,
  Blogs
} from "./components";
const App = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  const [panel, setpanel] = useState(true);
  const [blogs, setBlogs] = useState(null);
  const [text, settext] = useState(null);
  const [thumb, setthumb] = useState(null);
  const [heading, setheading] = useState(null);
  const [time, settime] = useState(null);
  const [category, setcategory] = useState(null);
  const [doddle, setdoddle] = useState(null);
  const [check,setCheck] = useState(false);
  /*states for admin panel */ const [username, setusername] = useState(null);
  const [previlage, setprevilage] = useState(false);
  const [num, setnum] = useState(null);
  const [bcc, setbcc] = useState(null);
 
  useEffect(() => {
    let blogs = firebase.database().ref("blogs");
    blogs.on("value", (snapshot) => {
      let array = snapshot.val();
      let data = [];
      // for (let id in array) {
      //   data.push(array);
      // }
      setBlogs(array);
    });
    let doddle = firebase.database().ref("doddle");
    doddle.on("value", (snap) => {
      setdoddle(snap.val());
    });
    let bccs = firebase.database().ref("contacts");
    bccs.on("value",(snapshot)=>{
      let bccarray=snapshot.val();
      setbcc(Object.values(bccarray))
    })
  }, []);
  console.log(doddle);
 console.log(blogs)
 
  return (
    <Router>
      
      {blogs != null ? (
        <>
          
          <div className="container" style={{ marginTop: "5%",overflow:"hidden"}}>
            
            {doddle && (
              <Nav admin={check} doddle={doddle.doddle} previlage={previlage} blogs={blogs}/>
            )}
            <Switch>
              
              <Route path="/" exact>
                
                {doddle && (
                  <Showcase
                    img={doddle.doddle}
                    heading={doddle.head}
                    tag={doddle.tag}
                    bcc={setbcc}
                  />
                )}
                <BlogIntro />
               
                  <div id="hello">
                  <Grid
                    item
                    xs="12"
                    style={{
                      display: "flex",
                      padding: "5%",
                      justifyContent: "center",
                      
                    }}
                  >
                    
                    <h1>Latest Blogs</h1>
                  </Grid>
                  {/* <Grid
                    container
                    md="10"
                    xs="12"
                    
                    spacing={3}
                    style={{ display: "flex",}} */}
                  <div className="blogcontainer" id="blogcontainer"  style={{width:"100%",display:"flex",overflowX:"scroll"}}  >
                    
                    {blogs != null ? 
                     
                      Object.keys(blogs).reverse().slice(0,6).map(function(keyName, keyIndex){
                        let i = blogs[keyName];
                        return <div style={{padding:"1%"}}>
                            
                              <Blogpop
                              heading={i.title}
                              category={i.category}
                              time={i.time}
                              thumb={i.thumb}
                              id={keyName}
                              />
                        
                        </div>
                        
                      }
                      
                    ) : (
                      <img src={loading} alt="loading.." />
                    )}
                  </div>
                  </div>
              </Route>
              <Route path="/about">
                
                <About />
              </Route>
              <Route path="/blog">
                
                <Blog
                  text={text}
                  thumb={thumb}
                  heading={heading}
                  time={time}
                  category={category}
                />
              </Route>
              <Route path="/contact">
                
                <Contact />
              </Route>
              <Route path="/blogs">
                <Blogs blogs={blogs}/>
              </Route>
              <Route path="/admin">
                
                {panel === false ? (
                  <SecureIn
                    panel={setpanel}
                    username={setusername}
                    previlage={true}
                    num={setnum}
                  />
                ) : (
                  <Panel
                    bcc={bcc}
                    name={username}
                    previlage={true}
                    number={num}
                    blog={blogs}
                    check={check}
                    setCheck={setCheck}
                  />
                )}
              </Route>
            </Switch>
            <Footer />
          </div>
        </>
      ) : (
        <img
          src={loading}
          alt="loading.."
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </Router>
  );
};
export default App;
