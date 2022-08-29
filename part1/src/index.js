import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Title = ({title}) => (
  <h1>{title}</h1>
)

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Statistic = ({text, value}) => (
  <p>{text} {value}</p>
)

const StatisticPercentaje = ({text, value}) => (
  <p>{text} {value*100} %</p>
)

const Statistics = (props) => {
  const { good, neutral, bad, total, averange, positive } = props.data

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />

      <Statistic text="total" value={total} />
      <Statistic text="averange" value={averange} />
      <StatisticPercentaje text="positive" value={positive} />
    </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const averange = (good - bad) / total
  const positive = good / total

  const statistincsObj = {
    good,
    neutral,
    bad,
    total,
    averange,
    positive
  }

  return (
    <div>
      <Title title="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Title title="statistics" />
      <Statistics data={statistincsObj} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

