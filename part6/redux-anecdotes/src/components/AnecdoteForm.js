import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const addAnec = async (e) => {
    e.preventDefault();
    const data = e.target.anecdote.value;
    e.target.anecdote.value = "";

    createAnecdote(data);
    setNotification(`added anecdote: ${data}`, 5);
  };

  return (
    <form onSubmit={addAnec}>
      <div>
        <input name="anecdote" />
        <button type="submit">create</button>
      </div>
    </form>
  );
};

const ConnectedAnecdoteForm = connect(null, {
  createAnecdote,
  setNotification,
})(AnecdoteForm);

export default ConnectedAnecdoteForm;
