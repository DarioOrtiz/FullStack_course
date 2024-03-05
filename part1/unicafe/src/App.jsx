import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text}: {value}</p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedbacks = good + neutral + bad;
  const averageScore = totalFeedbacks === 0 ? 0 : (good - bad) / totalFeedbacks;
  const positivePercentage = totalFeedbacks === 0 ? 0 : (good / totalFeedbacks) * 100;

  return (
    <div>
      <h2>Resultados:</h2>
      <StatisticLine text="Buenos" value={good} />
      <StatisticLine text="Neutrales" value={neutral} />
      <StatisticLine text="Malos" value={bad} />
      <StatisticLine text="Total de comentarios" value={totalFeedbacks} />
      <StatisticLine text="Puntuación promedio" value={averageScore} />
      <StatisticLine text="Porcentaje de comentarios positivos" value={`${positivePercentage}%`} />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const totalFeedbacks = good + neutral + bad;
  const showStatistics = totalFeedbacks > 0;

  return (
    <div>
      <h1>Recopilación de Comentarios</h1>
      <div>
        <Button handleClick={handleGoodClick} text="Bueno" />
        <Button handleClick={handleNeutralClick} text="Neutral" />
        <Button handleClick={handleBadClick} text="Malo" />
      </div>
      {showStatistics && <Statistics good={good} neutral={neutral} bad={bad} />}
      <h2>Detalles:</h2>
      <p>Buenos: {good}</p>
      <p>Neutrales: {neutral}</p>
      <p>Malos: {bad}</p>
    </div>
  );
};

export default App;
