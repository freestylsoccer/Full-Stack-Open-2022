import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const [ nameFilter, setNameFilter ] = useState('')
  useEffect(() => {
      // console.log("use effect")
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log(response.data)
          setPersons(response.data)
        })
    }, [])
  
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(element => element.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    let newPerson = [...persons]
    const person = {
      name: newName,
      number: newNumber
    }
    newPerson = newPerson.concat(person)

    setPersons(newPerson)
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = nameFilter === ''
    ? persons
    : persons.filter(person =>
        person.name.toLocaleLowerCase().indexOf(nameFilter.toLocaleLowerCase()) !== -1
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} onChange={handleNameFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSumbit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App