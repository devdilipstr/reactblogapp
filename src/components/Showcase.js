import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Button } from "@material-ui/core";
import Newsletter from "./Newsletter";
import "../style.css";
import { showcaseService } from "../services";

const style = makeStyles({
  heading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  tag: { textAlign: "center" },
  svg: { width: "100%", margin: "0" },
  showcase: { display: "flex", justifyContent: "center" },
});

function Showcase() {
  const classes = style();
  const [showcase, setShowcase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShowcase();
  }, []);

  const fetchShowcase = async () => {
    try {
      const response = await showcaseService.getActive();
      if (response.success && response.showcases && response.showcases.length > 0) {
        setShowcase(response.showcases[0]);
      }
    } catch (error) {
      console.error('Error fetching showcase:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '5%' }}>Loading...</div>;
  }

  if (!showcase) {
    return null; // Don't show anything if no showcase
  }

  return (
    <Grid
      container
      xs="12"
      justify="center"
      spacing={5}
      className={classes.showcase}
    >
      <Grid item xs="12" md="6">
        <img
          src={showcase.image?.url || showcase.doddle}
          alt={showcase.image?.alt || showcase.title}
          className={classes.svg}
        />
      </Grid>
      <Grid
        item
        xs="12"
        md="5"
        className={classes.heading}
        style={{ padding: "5%" }}
      >
        <h1>{showcase.title || showcase.head}</h1>
        <p className={classes.tag}>{showcase.subtitle || showcase.tag}</p>
        {showcase.description && (
          <p className={classes.tag}>{showcase.description}</p>
        )}
        {showcase.ctaButton?.enabled && showcase.ctaButton?.link && (
          <Button
            variant="contained"
            style={{
              background: showcase.backgroundColor || "#333",
              color: showcase.textColor || "#fff",
              marginTop: "20px",
            }}
            href={showcase.ctaButton.link}
          >
            {showcase.ctaButton.text || "Learn More"}
          </Button>
        )}
        <Newsletter />
      </Grid>
    </Grid>
  );
}

export default Showcase;
