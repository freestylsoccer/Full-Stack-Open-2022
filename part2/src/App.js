import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(element => element.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    let newPerson = [...persons]
    const person = {
      name: newName
    }
    newPerson = newPerson.concat(person)

    setPersons(newPerson)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

export default App
