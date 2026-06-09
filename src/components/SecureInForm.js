import React, { useState } from "react";
import { FormControl, TextField, Button, CircularProgress } from "@material-ui/core";
import authService from "../services/authService";

function SecureInForm({ panel, username, previlage, num }) {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const sendOTP = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.sendOTP(email);
      setOtpSent(true);
      setError("");
      setUserExists(response.userExists || false);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.verifyOTP(email, otp, name || null);
      
      if (response.success) {
        // Pass user data to parent
        username(response.user.name);
        previlage(response.user.role === 'admin');
        num(response.user.email);
        panel(true);
      }
    } catch (err) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormControl style={{ transition: "all ease-in-out .3s", width: "100%" }}>
      {!otpSent ? (
        <>
          <TextField
            type="email"
            error={!!error}
            helperText={error}
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            disabled={loading}
          />
          <br />
          <Button
            variant="contained"
            onClick={sendOTP}
            disabled={loading}
            style={{ background: "#333333", color: "white" }}
          >
            {loading ? <CircularProgress size={24} /> : "Send OTP"}
          </Button>
        </>
      ) : (
        <>
          <TextField
            type="text"
            error={!!error}
            helperText={error}
            value={otp}
            onChange={(e) => {
              setOTP(e.target.value);
              setError("");
            }}
            style={{ marginBottom: "5%" }}
            placeholder="Enter 6-digit OTP"
            disabled={loading}
          />
          {!userExists && (
            <TextField
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: "5%" }}
              disabled={loading}
              required
            />
          )}
          <Button
            variant="contained"
            onClick={verify}
            disabled={loading}
            style={{ background: "#333333", color: "white", marginBottom: "10px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Verify OTP"}
          </Button>
          <Button
            variant="text"
            onClick={() => {
              setOtpSent(false);
              setOTP("");
              setError("");
            }}
            disabled={loading}
          >
            Change Email
          </Button>
        </>
      )}
    </FormControl>
  );
}

export default SecureInForm;
