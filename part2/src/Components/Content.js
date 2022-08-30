import Part from "./Part"

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(item => 
        <Part key={item.id} name={item.name} exercises={item.exercises} />
      )}
    </div>
  )
}

export default Content