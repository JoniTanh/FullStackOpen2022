import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({ hasErrors: true, text: "wrong username or password" });
      setTimeout(() => {
        setMessage(undefined);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });

    if (blogObject.author && blogObject.title && blogObject.url) {
      setMessage({
        type: "create",
        text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
      });
      setTimeout(() => {
        setMessage(undefined);
      }, 5000);
    }
  };

  const updateBlog = (id, blogObject) => {
    blogService.update(id, blogObject);

    const updatedBlog = {
      ...blogObject,
      id,
    };

    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
  };

  const removeBlog = (id) => {
    const blog = blogs.filter((blog) => blog.id === id);

    if (window.confirm(`Remove blog ${blog[0].title} by ${blog[0].author}`)) {
      blogService.remove(id);
    }

    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification
          hasErrors={message?.hasErrors}
          message={message?.text}
          type={message?.type}
        />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>

      <Notification
        hasErrors={message?.hasErrors}
        message={message?.text}
        type={message?.type}
      />

      <div>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </div>
      <br />

      <BlogForm createBlog={addBlog} />

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
