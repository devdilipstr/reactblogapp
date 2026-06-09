import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Blogpop } from "../components";
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
});

function Blogs() {
  const classes = styles();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogService.getAll({ limit: 50 });
      
      if (response.success) {
        setBlogs(response.blogs);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5%' }}>
        <img src={loadingGif} alt="loading.." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '5%' }}>
        <h2>Error loading blogs</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div id="hello" style={{marginBottom:"5rem"}}>
      <Grid
        item
        xs="12"
        style={{
          display: "flex",
          marginBottom:"2rem",
          justifyContent: "center",
        }}
      >
        <h1>Blogs</h1>
      </Grid>
      <Grid
        container
        md="10"
        xs="12"
        spacing={3}
        style={{ display: "flex" }}
      >
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Grid
              key={blog._id}
              item
              xs="12"
              md="3"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Blogpop
                heading={blog.title}
                category={blog.category}
                time={new Date(blog.createdAt).toLocaleDateString()}
                thumb={blog.coverImage}
                id={blog._id}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs="12" style={{ textAlign: 'center' }}>
            <h2>No blogs found</h2>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Blogs;
