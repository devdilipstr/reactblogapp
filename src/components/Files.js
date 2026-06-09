import React, { useState } from "react";
import { Grid, makeStyles, CircularProgress,Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import uploadService from "../services/uploadService";
import "../style.css";

const styles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    background: "#f2f2f2",
    minHeight: "400px",
    flexDirection: "column",
    width: "400px",
    padding: "10%",
  },
});

function Files() {
  const classes = styles();
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploading(true);
    setError(null);

    try {
      const response = await uploadService.uploadImage(selectedFile, 'blog');
      if (response.success) {
        setUrl(response.url);
      }
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Grid container xs="12" md="8" justify="center" className={classes.root}>
      
      <Grid xs="2" justify="center" style={{ margin: "auto" }}>
        
        <label
          style={{
            background: "#0002",
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            padding: "3%",
            borderRadius: "100%",
          }}
        >
          
          <AddIcon />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </Grid>
      <Grid xs="11">
        {file && <p>{file.name}</p>}
        {uploading && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
            <p>Uploading...</p>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Grid>
      <Grid xs="12" style={{ display: "flex", overflowX: "scroll" }}>
        {url && (
          <div style={{ width: "100%" }}>
            <p style={{ wordBreak: "break-all" }}>{url}</p>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(url);
                alert("URL copied to clipboard!");
              }}
              variant="contained"
              size="small"
            >
              Copy URL
            </Button>
          </div>
        )}
      </Grid>
      <p style={{ opacity: 0.1, textAlign: "center" }}>upload and copy link.</p>
    </Grid>
  );
}
export default Files;
