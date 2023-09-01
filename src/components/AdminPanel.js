import React, { useState,useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  makeStyles,
  ButtonGroup,
  Checkbox,a
} from "@material-ui/core";
import "../style.css";
import emailjs from "emailjs-com";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import SpaceBarIcon from "@material-ui/icons/SpaceBar";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import LinkIcon from "@material-ui/icons/Link";
import firebase from "./firebase/config";
import SaveIcon from "@material-ui/icons/Save";
import Dside from "./Dside";
import AdminDrag from "./AdminDrag";
const style = makeStyles({
  root: { justifyContent: "center" },
  textarea: {
    border: "none",
    backgroundColor: "#f3f3f3",
    padding: "5%",
    borderRadius: "5px",
  },
  extentions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "grey",
    justifyContent: "center",
  },
  success: {
    backgroundColor: "green",
    color: "white",
    padding: "2%",
    margin: "1%",
    transition: "all ease-in-out .2s",
  },
});
function AdminPanel({ name, previlage, number, bcc,blog }) {
  const [code,setCode]= useState("");
  const [check,setCheck] = useState(true);
  const [dstatus,dSetStatus] = useState(false);
  const [fstatus,fSetStatus] = useState(false);
  bcc = String(bcc)
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  console.log(name + previlage + number);
  const classes = style();
  const [text, Settext] = useState("");
  const [viewtest, Setview] = useState(false);
  const [success, setsuccess] = useState(false);
  const save = () => {
    let text = document.getElementById("textfield").value;
    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let thumb = document.getElementById("Thumbnail").value;
    let time = Date().toString().slice(0,15);
    let popular = false;
    var data = { text, title, thumb, category, time, popular };
    console.log({ bcc });
    const sendData = firebase.database().ref("blogs");
    var newblog =sendData.push(data);
    var key = ""
    sendData.on('child_added', function(snapshot) {
      
        key = snapshot.key;
      
  });
    
    var linktosend ="https://"+ window.location.host +"/blog?b="+ key;

    emailjs.send(
      "service_gmmrvgr",
      "template_l8imey6",
      { category: category, heading: title, reply_to:bcc,link:linktosend},
      "a8ElFkGYvKukRV13Y"
    );
    document.getElementById("textfield").value = "";
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("Thumbnail").value = "";
    setsuccess(true);
  };
  if (success === true) {
    setTimeout(() => {
      setsuccess(false);
    }, 5000);
  }
  const bold = () => {
    let txt = document.getElementById("textfield");
    txt.value = txt.value + "<strong>ENTER BOLD TEXT HERE</strong>";
  };
  const italic = () => {
    let txt = document.getElementById("textfield");
    txt.value = txt.value + "<i>ENTER ITALIC TEXT HERE</i>";
  };
  const space = () => {
    let txt = document.getElementById("textfield");
    txt.value = txt.value + "<br></br>";
  };
  const btn = () => {
    let txt = document.getElementById("textfield");
    txt.value =
      txt.value +
      "<a href='enter your link here'' id='anchor'>enter name here</a>";
  };
  const H1 = () => {
    let txt = document.getElementById("textfield");
    txt.value = txt.value + "<h1></h1>";
  };
  const H2 = () => {
    let txt = document.getElementById("textfield");
    txt.value = txt.value + "<h2></h2>";
  };
  const H3 = () => {
    let txt = document.getElementById("textfield");
    txt.value = txt.value + "<h3></h3>";
  };
  const H4 = () => {
    let txt = document.getElementById("textfield");
    txt.value = txt.value + "<h4></h4>";
  };
  const view = () => {
    let para = document.getElementById("test");
    if (viewtest === false) {
      Setview(true);
      
      
                 let txt =  text.split(" ")  
                 let i =0
                 while(i<txt.length){
                  if(txt[i]=="/img"){
                    setCode(code+"<img src='"+txt[i+1]+"' width='100%'")
                  }
                  else{
                    setCode(txt[i])
                  }
                  i++
                 }
                 console.log(code)
                 para.innerHTML = code
      para.style.display = "block";
    } else {
      Setview(false);
      para.style.display = "none";
    }
  };
  return (
    
    <Grid container xs="12" justify="center" className={classes.root}>
    
      {check === true ? (
        <>
          
          {success === true ? (
            <div className={classes.success}>
              
              <p>
                
                your blog is added and newsletter to sended to all subscriber
              </p>
            </div>
          ) : (
            <></>
          )}
          <Grid xs="12" md="8" justify="center" style={{ textAlign: "center" }}>
            
            <h1>Add a new blog</h1>
          </Grid>
          
          <Grid
            container
            xs="12"
            
            spacing={5}
            style={{
              display: "flex",
              flexDirection: "column",
              padding:"5%"  
            }}
          > 
            
              <div style={{display:"flex"}}>
                <Button onClick={()=>{dSetStatus(!dstatus)}}>DODDLE</Button>
                <Button onClick={()=>{fSetStatus(!fstatus)}}>FILE UPLOAD</Button>
                <Dside open={dstatus} setstatus={dSetStatus}/>
                <AdminDrag open={fstatus} setStatus={fSetStatus}/>
              </div>  
              
              <TextField id="title" label="title" />
           
              
              <TextField id="category" label="category" />
            
           
              
               <TextField id="Thumbnail" label="Thumbnail" />
          
          </Grid>
          <Grid
            item
            xs="12"
            md="10"
            justify="center"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            
            <textarea
              rows="4"
              id="textfield"
              className={classes.textarea}
              onChange={(e) => {
                 Settext(e.target.value)
                 console.log(text )
              }}
              
            />
            <Grid item xs="2.3" md="1" className={classes.extentions}>
              
              <ButtonGroup orientation="vertical">
                
                <Button onClick={H1}>h1</Button>
                <Button onClick={H2}>h2</Button>
                <Button onClick={H3}>h3</Button>
                <Button onClick={H4}>h4</Button>
                <Button onClick={bold}>
                  
                  <FormatBoldIcon />
                </Button>
                <Button onClick={italic}>
                  
                  <FormatItalicIcon />
                </Button>
                <Button onClick={space}>
                  
                  <SpaceBarIcon />
                </Button>
                <Button onClick={btn}>
                  
                  <LinkIcon />
                </Button>
                <Button onClick={save}>
                  
                  <SaveIcon />
                </Button>
                <Checkbox
                  onChange={view}
                  icon={<VisibilityOffIcon />}
                  checkedIcon={<VisibilityIcon />}
                />
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid container xs="11" md="8" justify="center">
            
            <p id="test" style={{ display: "none", marginTop: "5%" }}></p>
          </Grid>
        </>
      ) : (
        <>
          <TextField onChange={
            (e)=>{
                if(e.target.value=="93518562566377838321"){
                 setCheck(true)
                }
            }
          }/>
        </>
      )}
    </Grid>
  );
}
export default AdminPanel;
