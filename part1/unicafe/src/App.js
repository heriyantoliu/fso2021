import React, { useState } from "react";

const Statistic = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>statistics</h1>
      good {good}
      <br />
      neutral {neutral}
      <br />
      bad {bad} <br />
      all {good + neutral + bad} <br />
      average {(good * 1 + bad * -1) / (good + neutral + bad)} <br />
      positive {(good / (good + neutral + bad)) * 100} %
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
  };
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  };
  const increaseBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={increaseGood}>good</button>
      <button onClick={increaseNeutral}>neutral</button>
      <button onClick={increaseBad}>bad</button>
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
