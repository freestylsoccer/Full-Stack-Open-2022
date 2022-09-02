import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.filter(p => p.name === newName)
    if (person.length > 0) {
      if(window.confirm(`${newName} is already added to phonebook, reace the old number with a new one?`)) {
        updatePerson(person[0]?.id)
      }
      return
    }
    
    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    
  }

  const deletePerson = (id) => {
    const person = persons.filter(p => p.id === id)

    if(window.confirm(`delete ${person[0]?.name}?`)){
      personService
      .deletePerson(id)
        .then(res => {
          setPersons(persons.filter(n => n.id !== id))
          console.log("successful deleted")
        })
        .catch(error => {
          console.log(error.message)
          alert(
            `person '${id}' was already deleted from server`
          )
          setPersons(persons.filter(n => n.id !== id))
        })
    }    

  }

  const updatePerson = (id) => {
    const person = persons.filter(p => p.id === id)
    const changedPerson = { ...person[0], number: newNumber }

    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
      .catch(error => {
        alert(
          `person '${persons[0]?.name}' was already deleted from server`
        )
        setPersons(persons.filter(p => p.id !== id))
      })
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App