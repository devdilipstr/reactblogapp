import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../style.css";
import { newsletterService } from "../services";

const styles = makeStyles({
  root: {
    border: "6px solid #f2f2f2",
    backgroundColor: "#f2f2f2",
    width: "300px",
    borderRadius: "30px",
    fontSize: "15px",
    marginBottom: "0",
    marginTop: "0",
    padding: "1%",
    textAlign: "center",
    zIndex: "100000",
  },
});

function Newsletter() {
  const classes = styles();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) return;

    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await newsletterService.subscribe(email);
      
      if (response.success) {
        setSuccess(true);
        setEmail("");
        e.target.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (err) {
      setError(true);
      setErrorMessage(err.message || "This email already exists, try with another one");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className={classes.root}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Subscribe to our newsletter"
        disabled={loading}
        required
      />
      {error && <small style={{ color: "red", display: "block", marginTop: "10px" }}>{errorMessage}</small>}
      {success && (
        <small style={{ color: "green", display: "block", marginTop: "10px" }}>
          Your subscription is added to our newsletter!
        </small>
      )}
    </form>
  );
}

export default Newsletter;
