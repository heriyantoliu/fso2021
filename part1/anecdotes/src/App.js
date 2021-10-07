import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [mostVote, setMostVote] = useState({ idx: 0, vote: 0 });

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 1)));
  };

  const addVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);

    if (mostVote.vote < votes[selected]) {
      setMostVote({ vote: votes[selected], idx: selected });
    }
  };

  return (
    <div>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes <br />
      <button onClick={addVote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVote.idx]}
      <br />
      has {votes[mostVote.idx]} votes
    </div>
  );
};

export default App;
