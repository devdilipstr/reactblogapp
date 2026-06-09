import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  makeStyles,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import "../style.css";
import SaveIcon from "@material-ui/icons/Save";
import blogService from "../services/blogService";
import newsletterService from "../services/newsletterService";
import authService from "../services/authService";

const style = makeStyles({
  root: { justifyContent: "center" },
  textarea: {
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    padding: "3%",
    borderRadius: "8px",
    width: "100%",
    minHeight: "400px",
    fontSize: "16px",
    fontFamily: "'Courier New', monospace",
    lineHeight: "1.6",
  },
  imagePreview: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "8px",
    marginTop: "10px",
    border: "2px solid #ddd",
  },
  success: {
    backgroundColor: "green",
    color: "white",
    padding: "2%",
    margin: "1%",
    borderRadius: "5px",
  },
  error: {
    backgroundColor: "red",
    color: "white",
    padding: "2%",
    margin: "1%",
    borderRadius: "5px",
  },
  section: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
  },
  preview: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    minHeight: "400px",
    "& h1": { fontSize: "2em", marginBottom: "0.5em" },
    "& h2": { fontSize: "1.5em", marginBottom: "0.5em" },
    "& h3": { fontSize: "1.17em", marginBottom: "0.5em" },
    "& p": { marginBottom: "1em", lineHeight: "1.8" },
    "& code": { backgroundColor: "#f4f4f4", padding: "2px 6px", borderRadius: "3px" },
    "& pre": { backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "5px", overflow: "auto" },
    "& blockquote": { borderLeft: "4px solid #ccc", paddingLeft: "16px", color: "#666" },
    "& ul, & ol": { marginLeft: "20px", marginBottom: "1em" },
    "& img": { maxWidth: "100%", height: "auto" },
  },
});

function AdminPanelNew({ name, previlage }) {
  const classes = style();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [sendNewsletter, setSendNewsletter] = useState(true);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await newsletterService.getAll();
      if (response.success) {
        setSubscribers(response.subscribers || []);
      }
    } catch (err) {
      console.error("Error fetching subscribers:", err);
    }
  };

  const save = async () => {
    if (!title || !category || !coverImage || !content) {
      setMessage({ text: "Please fill all fields", type: "error" });
      return;
    }

    if (content.length < 50) {
      setMessage({ text: "Content must be at least 50 characters", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const blogData = {
        title,
        category,
        coverImage,
        content,
        status: "published",
      };

      const result = await blogService.create(blogData);

      // Send newsletter to subscribers if enabled
      if (sendNewsletter && subscribers.length > 0) {
        try {
          await newsletterService.sendNewsletter({
            subject: `New Blog: ${title}`,
            blogTitle: title,
            blogCategory: category,
            blogUrl: `${window.location.origin}/blog?b=${result.blog?._id || ''}`,
          });
          setMessage({ 
            text: `Blog created and newsletter sent to ${subscribers.length} subscribers!`, 
            type: "success" 
          });
        } catch (newsletterErr) {
          setMessage({ 
            text: "Blog created but newsletter failed to send", 
            type: "error" 
          });
        }
      } else {
        setMessage({ text: "Blog created successfully!", type: "success" });
      }

      // Clear form
      setTitle("");
      setCategory("");
      setCoverImage("");
      setContent("");
      setSendNewsletter(true);
      setTabValue(0);
    } catch (error) {
      setMessage({ 
        text: error.message || "Failed to create blog", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if user is admin
  if (!previlage && !authService.isAdmin()) {
    return (
      <Grid container xs="12" justify="center" style={{ padding: "5%" }}>
        <h2>Access Denied - Admin Only</h2>
      </Grid>
    );
  }

  return (
    <Grid container xs="12" justify="center" className={classes.root}>
      {message.text && (
        <Grid item xs="12" md="10">
          <div className={message.type === "success" ? classes.success : classes.error}>
            <p>{message.text}</p>
          </div>
        </Grid>
      )}

      <Grid xs="12" md="8" justify="center" style={{ textAlign: "center" }}>
        <h1>Add a New Blog</h1>
        <p>Welcome, {name}</p>
      </Grid>

      <Grid
        container
        xs="12"
        spacing={3}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "5%",
          gap: "20px",
        }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          fullWidth
          required
          disabled={loading}
        />

        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          variant="outlined"
          fullWidth
          required
          disabled={loading}
        />

        <TextField
          label="Cover Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          variant="outlined"
          fullWidth
          required
          disabled={loading}
          helperText="Enter the full URL of the cover image"
        />

        {coverImage && (
          <div>
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Image Preview:</p>
            <img
              src={coverImage}
              alt="Cover preview"
              className={classes.imagePreview}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
            Content (Markdown supported) *
          </label>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            style={{ marginBottom: "10px" }}
          >
            <Tab label="Write" />
            <Tab label="Preview" />
          </Tabs>
          
          {tabValue === 0 ? (
            <>
              <textarea
                className={classes.textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Write your blog content in Markdown...\n\n# Heading 1\n## Heading 2\n### Heading 3\n\n**bold text**\n*italic text*\n\n- List item 1\n- List item 2\n\n[Link text](https://example.com)\n\n![Image alt](image-url)\n\n> Blockquote\n\n\`inline code\`\n\n\`\`\`\ncode block\n\`\`\``}
                disabled={loading}
              />
              <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
                <strong>Quick Markdown Guide:</strong>
                <ul style={{ margin: "10px 0", fontSize: "14px" }}>
                  <li># Heading 1, ## Heading 2, ### Heading 3</li>
                  <li>**bold**, *italic*, ***bold italic***</li>
                  <li>[Link](url), ![Image](url)</li>
                  <li>- List item, 1. Numbered list</li>
                  <li>&gt; Blockquote, `inline code`</li>
                </ul>
              </div>
            </>
          ) : (
            <div className={classes.preview}>
              <h3 style={{ marginTop: 0 }}>Preview:</h3>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
          <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
            Character count: {content.length} (minimum 50 required)
          </p>
        </div>

        <div className={classes.section}>
          <h3 style={{ marginTop: 0 }}>Newsletter Settings</h3>
          <FormControlLabel
            control={
              <Checkbox
                checked={sendNewsletter}
                onChange={(e) => setSendNewsletter(e.target.checked)}
                color="primary"
                disabled={loading}
              />
            }
            label={`Send newsletter to ${subscribers.length} subscriber(s)`}
          />
          <p style={{ fontSize: "14px", color: "#666", marginTop: "10px", marginBottom: 0 }}>
            {sendNewsletter
              ? "A newsletter will be sent to all subscribers when you publish this blog."
              : "Newsletter will not be sent."}
          </p>
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={save}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
          style={{
            marginTop: "20px",
            padding: "12px",
            fontSize: "16px",
            background: "#333",
          }}
        >
          {loading ? "Saving..." : "Save Blog"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default AdminPanelNew;
