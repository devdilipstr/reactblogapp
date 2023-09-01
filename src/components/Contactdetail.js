import React,{useEffect} from "react";
import { contact } from "../icons/index";
function Contactdetail() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <img
      alt="contact"
      src={contact}
      id="img"
      style={{
        position: "absolute",
        zIndex: "0",
        opacity: ".2",
        transform: "translate('-50%','60%')",
        pointerEvents: "none",
        width: "70%",
        height: "70%",
      }}
    />
  );
}
export default Contactdetail;
