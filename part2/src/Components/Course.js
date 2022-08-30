import Header from "./Header"
import Content from "./Content"

const Total = ({ sum }) => <h5>total of {sum} exercises</h5>

const Course = (props) => {
  const {name, parts} = props.course
  const total = parts.reduce((p, c) => p + c.exercises, 0)

  return (
    <>
      <Header text={name} />
      <Content parts={parts} />
      <Total sum={total} />
    </>
  )
}

export default Course