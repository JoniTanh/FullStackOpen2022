import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [viewVisible, setViewVisible] = useState(false);

  const hideViewVisible = { display: viewVisible ? "none" : "" };
  const showViewVisible = { display: viewVisible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 2,
    border: "solid",
    borderWith: 1,
    marginBottom: 5,
  };

  const update = () => {
    const { id, author, url, title } = blog;
    const updatedBlog = {
      likes: blog.likes + 1,
      author,
      title,
      url,
    };

    updateLikes(id, updatedBlog);
  };

  const remove = () => {
    const { id } = blog;

    removeBlog(id);
  };

  return (
    <div style={blogStyle} className="blog">
      <div style={hideViewVisible} className="defaultContent">
        {blog.title} {blog.author + " "}
        <button id="view-button" onClick={() => setViewVisible(true)}>
          view
        </button>
      </div>
      <div style={showViewVisible} className="allContent">
        {blog.title + " "}
        <button onClick={() => setViewVisible(false)}>hide</button> <br />
        {blog.url} <br />
        {"likes " + blog.likes + " "}
        <button onClick={update}>like</button>
        <br />
        {blog.author} <br />
        {blog.user?.username === user.username && (
          <button onClick={remove}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
  }),
  updateLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
  }),
};
