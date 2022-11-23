import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Header = ({ text }) => <h1>{text}</h1>;

const Display = ({ value, value2 }) => (
  <div>
    <p>
      {value} <br />
      has {value2} votes
    </p>
  </div>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostVotes, setLeadingAnecdote] = useState(selected);

  const setAnecdote = () => {
    setSelected(Math.floor(Math.random() * 7));
  };

  const setVote = () => {
    const anecdotesCopy = [...votes];
    anecdotesCopy[selected] += 1;
    setVotes(anecdotesCopy);

    if (anecdotesCopy[selected] > anecdotesCopy[mostVotes]) {
      setLeadingAnecdote(selected);
    }
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Display value={anecdotes[selected]} value2={votes[selected]} />
      <Button handleClick={setVote} text="vote" />
      <Button handleClick={setAnecdote} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Display value={anecdotes[mostVotes]} value2={votes[mostVotes]} />
    </div>
  );
};

export default App;
