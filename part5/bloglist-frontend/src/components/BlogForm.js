import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [blogsVisible, setBlogsVisible] = useState(false);

  const hideWhenVisible = { display: blogsVisible ? "none" : "" };
  const showWhenVisible = { display: blogsVisible ? "" : "none" };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    setBlogsVisible(false);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogsVisible(true)}>create blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          <div>
            title:{" "}
            <input value={newTitle} onChange={handleTitleChange} id="title" />
          </div>
          <div>
            author:{" "}
            <input
              value={newAuthor}
              onChange={handleAuthorChange}
              id="author"
            />
          </div>
          <div>
            url: <input value={newUrl} onChange={handleUrlChange} id="url" />
          </div>
          <div>
            <button type="submit" id="create-button">
              create
            </button>
          </div>
        </form>
        <button onClick={() => setBlogsVisible(false)}>cancel</button>
      </div>
      <br />
    </div>
  );
};

export default BlogForm;

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};
