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
    <table>
      <tbody>
        <tr>
          <td>{"good"}</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>{"neutral"}</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>{"bad"}</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>{"all"}</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>{"averange"}</td>
          <td>{averange}</td>
        </tr>
        <tr>
          <td>{"positive"}</td>
          <td>{positive * 100}%</td>
        </tr>
      </tbody>
    </table>
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

