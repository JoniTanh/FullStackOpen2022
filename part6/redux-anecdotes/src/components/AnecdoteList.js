import React from "react";
import { connect } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = ({ filter, anecdotes, voteAnecdote, setNotification }) => {
  const filterAnecdotes = () => {
    if (filter.filter === "") return anecdotes;

    return anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.filter.toLowerCase())
      )
      .sort((a, b) => (a.votes > b.votes ? -1 : 1));
  };

  const vote = (votedAnecdote) => {
    voteAnecdote(votedAnecdote);
    setNotification(`you voted ${votedAnecdote.content}`, 5);
  };

  return (
    <div>
      {filterAnecdotes()
        .sort((a, b) => (a.votes > b.votes ? -1 : 1))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = ({ anecdotes, filter }) => {
  return {
    anecdotes,
    filter,
  };
};

const ConnectedAnecdoteList = connect(mapStateToProps, {
  voteAnecdote,
  setNotification,
})(AnecdoteList);

export default ConnectedAnecdoteList;
