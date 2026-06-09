import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Button, IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ReactMarkdown from "react-markdown";
import "../style.css";
import { blogService } from "../services";
import { loading as loadingGif } from "../icons";

const styles = makeStyles({
  root: { justifyContent: "center" },
  heading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  gap: { paddingTop: "5%" },
  likeButton: {
    marginLeft: "10px",
  },
  markdown: {
    lineHeight: "1.8",
    "& h1": { fontSize: "2em", marginBottom: "0.5em" },
    "& h2": { fontSize: "1.5em", marginBottom: "0.5em" },
    "& h3": { fontSize: "1.17em", marginBottom: "0.5em" },
    "& p": { marginBottom: "1em" },
    "& code": { backgroundColor: "#f4f4f4", padding: "2px 6px", borderRadius: "3px" },
    "& pre": { backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "5px", overflow: "auto" },
    "& blockquote": { borderLeft: "4px solid #ccc", paddingLeft: "16px", color: "#666" },
    "& ul, & ol": { marginLeft: "20px", marginBottom: "1em" },
    "& img": { maxWidth: "100%", height: "auto" },
  },
});

function Blog() {
  const classes = styles();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [see, setSee] = useState(true); // Show content by default
  const [likes, setLikes] = useState(0);

  // Get blog identifier from URL
  const queryParameters = new URLSearchParams(window.location.search);
  const identifier = queryParameters.get("b"); // slug or ID

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (identifier) {
      fetchBlog();
    }
  }, [identifier]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await blogService.getOne(identifier);
      
      if (response.success) {
        setBlog(response.blog);
        setLikes(response.blog.likes || 0);
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const response = await blogService.like(identifier);
      if (response.success) {
        setLikes(response.likes);
      }
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  const toggleContent = () => {
    setSee(!see);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5%' }}>
        <img src={loadingGif} alt="loading.." />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div style={{ textAlign: 'center', padding: '5%' }}>
        <h2>Blog not found</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Grid container xs="12" className={classes.root} style={{ marginBottom: "60px" }}>
      <Grid item xs="10" className={classes.heading}>
        <h1>{blog.title}</h1>
        <h4>{blog.category}</h4>
        <br />
        <small style={{ padding: "0", opacity: ".6" }}>
          {new Date(blog.createdAt).toLocaleDateString()}
        </small>
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <VisibilityIcon style={{ fontSize: '18px', color: '#666' }} />
          <small>{blog.views || 0} views</small>
          <IconButton
            className={classes.likeButton}
            onClick={handleLike}
            size="small"
            color="secondary"
          >
            <FavoriteIcon />
          </IconButton>
          <small>{likes} likes</small>
        </div>
        {blog.tags && blog.tags.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  background: '#f0f0f0',
                  padding: '5px 10px',
                  margin: '5px',
                  borderRadius: '15px',
                  fontSize: '12px',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Grid>

      <Grid item xs="10" md="8" className={classes.heading}>
        <br />
        <img
          alt={blog.title}
          src={blog.coverImage}
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "cover",
            borderRadius: "20px",
          }}
        />
      </Grid>

      <Grid item xs="10" style={{ paddingTop: "5%" }}>
        <Button onClick={toggleContent}>
          {see ? "Hide Content" : "Show Content"}
        </Button>
        
        {see && (
          <div className={classes.markdown} style={{ marginTop: '20px' }}>
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default Blog;
