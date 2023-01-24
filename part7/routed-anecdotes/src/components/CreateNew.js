import React from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const { reset: contentReset, ...content } = useField("text");
  const { reset: authorReset, ...author } = useField("text");
  const { reset: infoReset, ...info } = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const resetForm = () => {
    contentReset();
    authorReset();
    infoReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
      <button onClick={resetForm}>reset</button>
    </div>
  );
};

export default CreateNew;
