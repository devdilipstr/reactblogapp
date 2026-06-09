import React from "react";
import { Grid, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function Blogpop({ heading, category, time, thumb, id }) {
  var link = "/blog?b=" + id;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        width: "280px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
      }}
    >
      <Grid item xs="12">
        <img
          alt={heading}
          src={thumb}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
      </Grid>
      <Grid item xs="12" style={{ padding: "20px",paddingTop:"10px" }}>
        <h3 style={{ margin: "0 0 10px 0", fontSize: "1.2rem", lineHeight: "1.4" }}>
          {heading}
        </h3>
        <div style={{ marginBottom: "15px" }}>
          <small style={{ fontSize: "0.85rem", color: "#999" }}>
            {category} | {time}
          </small>
        </div>
        <NavLink to={link} exact style={{ textDecoration: "none" }}>
          <Button
            variant="ghost"
            size="small"
            style={{
              background:"#000",
              color: "#fff",
              textTransform: "none",
              borderRadius: "20px",
              padding: "8px 20px",
              fontSize: "0.9rem",
              width:"100%"
            }}
            endIcon={<ArrowForwardIcon />}
          >
            Read More
          </Button>
        </NavLink>
      </Grid>
    </div>
  );
}

export default Blogpop;
