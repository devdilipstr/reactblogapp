/*dependency imports */
import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { blogService, showcaseService, authService } from "./services";
import { loading } from "./icons";
import Contact from "./components/Contact";
import About from "./components/About";
import { mail } from "./icons";
/*components imports */
import {
  Nav,
  BlogIntro,
  Showcase,
  Blogpop,
  Footer,
  Blog,
  SecureIn,
  PanelNew,
  Blogs,
  UserManagement,
  Newsletter,
  Hero
} from "./components";

const App = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const [panel, setPanel] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [showcase, setShowcase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = authService.isLoggedIn();
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const userData = authService.getStoredUser();
      setUser(userData);
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch blogs (latest 6)
      const blogsResponse = await blogService.getAll({ limit: 6 });
      if (blogsResponse.success) {
        setBlogs(blogsResponse.blogs);
      }

      // Fetch showcase
      const showcaseResponse = await showcaseService.getActive();
      if (showcaseResponse.success && showcaseResponse.showcases.length > 0) {
        setShowcase(showcaseResponse.showcases[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  if (loading) {
    return (
      <img
        src={loading}
        alt="loading.."
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  return (
    <Router>
      <div className="container" style={{ marginTop: "5%", overflow: "hidden" }}>
        <Nav 
          admin={user?.isAdmin || user?.role === 'admin'} 
          blogs={blogs}
          user={user}
          onLogout={handleLogout}
        />
        
        <Switch>
          <Route path="/" exact>
            <Hero />
            
            {showcase && <Showcase />}
            
            <BlogIntro />
            
            <div style={{ padding: "0 5%", marginTop: "60px" }}>
              <Grid
                item
                xs="12"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <h1>Latest Blogs</h1>
              </Grid>
              
              <div 
                className="blogcontainer" 
                id="blogcontainer" 
                style={{ width: "100%", display: "flex", overflowX: "scroll" }}
              >
                {blogs && blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <div key={blog._id} style={{ padding: "1%" }}>
                      <Blogpop
                        heading={blog.title}
                        category={blog.category}
                        time={new Date(blog.createdAt).toLocaleDateString()}
                        thumb={blog.coverImage}
                        id={blog._id}
                      />
                    </div>
                  ))
                ) : (
                  <p>No blogs available</p>
                )}
              </div>
            </div>
            
            {/* Newsletter Section */}
            <Grid
              container
              justify="center"
              alignItems="center"
              spacing={3}
              style={{
                padding: "60px 5%",
                backgroundColor: "#333333",
                marginTop: "60px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <img src={mail} alt="Newsletter" style={{ width: "150px", height: "auto" }} />
              </Grid>
              
              <Grid item xs={12} md={8}>
                <h2 style={{ fontSize: "2.5em", marginBottom: "20px", color: "#fff" }}>
                  Stay Updated!
                </h2>
                <p style={{ fontSize: "1.2em", marginBottom: "30px", color: "#ddd" }}>
                  Subscribe to our newsletter and never miss our latest blogs and updates.
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Newsletter />
                </div>
              </Grid>
            </Grid>
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/blog">
            <Blog />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>

          <Route path="/blogs">
            <Blogs />
          </Route>

          <Route path="/users">
            {isLoggedIn && (user?.isAdmin || user?.role === 'admin') ? (
              <UserManagement />
            ) : (
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Access Denied</h2>
                <p>Admin access required</p>
              </div>
            )}
          </Route>

          <Route path="/admin">
            {!isLoggedIn ? (
              <SecureIn
                panel={(loggedIn) => {
                  if (loggedIn) {
                    setIsLoggedIn(true);
                  }
                }}
                username={(name) => setUser({ ...user, name })}
                previlage={(isAdmin) => setUser({ ...user, isAdmin })}
                num={(email) => setUser({ ...user, email })}
              />
            ) : (
              <PanelNew 
                name={user?.name || 'Admin'} 
                previlage={user?.isAdmin || user?.role === 'admin'}
              />
            )}
          </Route>
        </Switch>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
