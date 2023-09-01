import React, { useState } from "react";
import { Button, List, Checkbox, Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../style.css";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { logo } from "../icons";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import ImageIcon from "@material-ui/icons/Image";
import AdminDrag from "./AdminDrag";
import Dside from "./Dside";
import BurstModeIcon from "@material-ui/icons/BurstMode";
const useStyle = makeStyles({
  root: {
    display: "flex",
    position: "fixed",
    height: "10vh",
    backgroundColor: "white",
    zIndex: "10000",
    justifyContent: "space-around",
    alignItems: "center",
    top: "0",
    width: "100%",
    transition: "all ease-in-out .2s",
  },
  btn: { textTransform: "none", borderRadius: "100px" },
  list: {
    position: "fixed",
    right: "0",
    top: "0",
    width: "100%",
    marginTop:"10vh",
    height: "15vh",
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "row",
    transition: "all ease-in-out .2s",
    background: "#f4f4f4",
    padding: "10%",
  },
  nav: { zIndex: "1200" },
  active: { backgroundColor: "#f2f2f2" },
});
function Nav({ check, doddle, previlage,blogs}) {
  const [nav, setNav] = useState(false);
  const [side, setside] = useState(false);
  const [dside, setdside] = useState(false);
  const [toggleNav, toggleNavOff] = useState(false);
  const [toggleDoddle, toggleDoddleOff] = useState(false);
  const [toggleFile, toggleFileOff] = useState(false);
  const classes = useStyle();
  const handle = () => {
    if (toggleNav === false) {
      setNav(true);
      toggleNavOff(true);
    } else {
      toggleNavOff(false);
      setNav(false);
    }
  };
  const handleside = () => {
    if (toggleFile === false) {
      setside(true);
      toggleFileOff(true);
    } else {
      toggleFileOff(false);
      setside(false);
    }
  };
  const sideclose = () => {
    setside(false);
    toggleFileOff(false);
  };
  const dhandleside = () => {
    if (toggleDoddle === false) {
      setdside(true);
      toggleDoddleOff(true);
    } else {
      toggleDoddleOff(false);
      setdside(false);
    }
  };
  const dsideclose = () => {
    setdside(false);
    toggleDoddleOff(false);
  };
  return (
    <motion>
      
      <div className={classes.root} id="root">
        
        <div>
          
          <Link to="/">
            
            <img alt="" src={logo} width="30px" height="30px" />
          </Link>
        </div>
        <div className="toggle">
          
          <Checkbox
            className={classes.nav}
            icon={<MenuRoundedIcon />}
            onClick={handle}
            color="none"
            checkedIcon={<MenuRoundedIcon />}
          ></Checkbox>
        </div>
        <motion.ul
          className="NavUl"
          style={{ transition: "all ease-in-out 3s" }}
          initial={{ opacity: "0" }}
          animate={{ opacity: "1" }}
        >
          
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              height: "100%",
              width: "100%",
              margin: "0",
            }}
            className="navlink"
            activeClassName="nav-active"
            exact
          >
            
            <Button className={classes.btn}>Home</Button>
          </NavLink>
          <NavLink
            to="/blogs"
            style={{ textDecoration: "none" }}
            activeClassName="nav-active"
            exact
          >
            
            <Button className={classes.btn}>
              
              Blogs
            </Button>
          </NavLink>
          <NavLink
            to="/contact"
            style={{ textDecoration: "none" }}
            activeClassName="nav-active"
            exact
          >
            
            <Button className={classes.btn}>Contact</Button>
          </NavLink>
          <NavLink
            to="/about"
            style={{ textDecoration: "none" }}
            activeClassName="nav-active"
            exact
          >
            
            <Button className={classes.btn}>About</Button>
          </NavLink>
          
        </motion.ul>
        {check === true? (
          <div
            className="tools"
            style={{ position: "fixed", top: "2px", right: "0" }}
          >
            
            <Checkbox
              icon={<ImageIcon />}
              checkedIcon={<ImageIcon />}
              onClick={dhandleside}
              color="none"
            />
          </div>
        ) : (
          <></>
        )}
        {check === true && previlage === true ? (
          <div
            className="tools"
            style={{ position: "fixed", top: "2px", right: "35px" }}
          >
            
            <Checkbox
              icon={<BurstModeIcon />}
              checkedIcon={<BurstModeIcon />}
              onClick={handleside}
              color="none"
            />
          </div>
        ) : (
          <></>
        )}
        {check === true ? <AdminDrag open={side} Close={sideclose} /> : <></>}
        {check === true ? (
          <Dside open={dside} Close={dsideclose} fdoddle={doddle} />
        ) : (
          <></>
        )}
        <Drawer
          anchor="right"
          open={nav}
          onClose={() => {
            setNav(false);
          }}
          
        >
          
          <List className={classes.list} open={nav}>
            
            <NavLink
              to="/"
              style={{ textDecoration: "none", }}
              className="navlink"
              activeClassName="nav-active"
              exact
            >
              <Button >Home</Button>
            </NavLink>
            <NavLink
              to="/blogs"
              style={{ textDecoration: "none" }}
              activeClassName="nav-active"
              exact
            >
              
              <Button >Blogs</Button>
            </NavLink>
            <NavLink
              to="/contact"
              style={{ textDecoration: "none" }}
              activeClassName="nav-active"
              exact
            >
              
              <Button >Contact</Button>
            </NavLink>
            
            <NavLink
              to="/about"
              style={{ textDecoration: "none" }}
              activeClassName="nav-active"
              exact
            >
              
              <Button >About</Button>
            </NavLink>
            
          </List>
        </Drawer>
      </div>
    </motion>
  );
}
export default Nav;
