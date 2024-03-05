import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>Votes: {votes}</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  const maxVotes = Math.max(...votes);
  const maxVotesIndex = votes.indexOf(maxVotes);
  const anecdoteWithMaxVotes = anecdotes[maxVotesIndex];

  return (
    <div>
      <h1>Anécdota del Día</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <div>
        <Button handleClick={handleVote} text="Votar" />
        <Button handleClick={handleNextAnecdote} text="Siguiente Anécdota" />
      </div>
      <h2>Anécdota con la mayor cantidad de votos</h2>
      {maxVotes > 0 && <Anecdote anecdote={anecdoteWithMaxVotes} votes={maxVotes} />}
    </div>
  );
};

export default App;
