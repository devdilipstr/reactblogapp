import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../style.css";

function Hero() {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{
        minHeight: "70vh",
        padding: "80px 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Elements */}
      <motion.svg
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "200px",
          height: "200px",
          opacity: "0.1",
          zIndex: "0",
        }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="80" fill="#667eea" />
      </motion.svg>

      <motion.svg
        animate={{
          y: [0, 30, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "60%",
          right: "-3%",
          width: "250px",
          height: "250px",
          opacity: "0.08",
          zIndex: "0",
        }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="20" y="20" width="160" height="160" rx="30" fill="#764ba2" />
      </motion.svg>

      <motion.svg
        animate={{
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "5%",
          left: "15%",
          width: "150px",
          height: "150px",
          opacity: "0.06",
          zIndex: "0",
        }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="100,20 180,180 20,180" fill="#f093fb" />
      </motion.svg>

      <motion.svg
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          top: "20%",
          right: "20%",
          width: "100px",
          height: "100px",
          opacity: "0.1",
          zIndex: "0",
        }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="60" fill="none" stroke="#667eea" strokeWidth="8" />
      </motion.svg>

      <motion.svg
        animate={{
          x: [0, 20, 0],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "120px",
          height: "120px",
          opacity: "0.07",
          zIndex: "0",
        }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M100,20 L180,100 L100,180 L20,100 Z" fill="#4facfe" />
      </motion.svg>

      {/* Content */}
      <Grid item xs={12} md={8} style={{ position: "relative", zIndex: "1" }}>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "700",
            marginBottom: "20px",
            lineHeight: "1.2",
            color: "#000",
          }}
        >
          Discover Stories That Inspire
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            marginBottom: "40px",
            color: "#666",
            maxWidth: "700px",
            margin: "0 auto 40px",
          }}
        >
          Explore our collection of insightful articles on technology, innovation, and the digital world
        </p>
        <Link to="/blogs" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "15px 40px",
              fontSize: "1.1rem",
              fontWeight: "600",
              borderRadius: "50px",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            View All Blogs →
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default Hero;
