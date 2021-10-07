import React, { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const Statistic = ({ good, neutral, bad }) => {
  if (good || neutral || bad) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={good + neutral + bad} />
            <StatisticLine
              text="Average"
              value={(good * 1 + bad * -1) / (good + neutral + bad)}
            />
            <StatisticLine
              text="Positif"
              value={(good / (good + neutral + bad)) * 100}
            />
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div>No feedback given</div>;
  }
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
      <Button onClick={increaseGood} text="Good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
