import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch({
      type: 'ADD_VOTE',
      data: {
        id,
      },
    });
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_ANECDOTE',
      data: {
        anecdote: event.target.anecdote.value,
      },
    });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => a.votes - b.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;