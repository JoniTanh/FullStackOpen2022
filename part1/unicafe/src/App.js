import { useState } from "react";

const Header = ({ text }) => (
  <>
    <h2>{text}</h2>
  </>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const totalCount = good + neutral + bad;

  return (
    <>
      {totalCount > 0 ? (
        <>
          <StatisticsLine text={"good"} value={good} />
          <StatisticsLine text={"neutral"} value={neutral} />
          <StatisticsLine text={"bad"} value={bad} />
          <StatisticsLine text={"all"} value={totalCount} />
          <StatisticsLine text={"average"} value={(good - bad) / totalCount} />
          <StatisticsLine text={"positive"} value={(good / totalCount) * 100} />
        </>
      ) : (
        "no feedback given"
      )}
    </>
  );
};

const StatisticsLine = ({ text, value }) => (
  <table>
    <tbody>
      <tr>
        <td style={{ width: "55px" }}>{text}</td>
        <td>
          {value} {text === "positive" ? "%" : ""}
        </td>
      </tr>
    </tbody>
  </table>
);

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

  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header text={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
