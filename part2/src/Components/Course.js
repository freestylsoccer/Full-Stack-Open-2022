import Header from "./Header"
import Content from "./Content"

const Course = (props) => {
  const {name, parts} = props.course

  return (
    <>
      <Header text={name} />
      <Content parts={parts} />
    </>
  )
}

export default Course