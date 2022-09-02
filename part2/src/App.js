import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const [ nameFilter, setNameFilter ] = useState('')

  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

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
        setMessage(`Added ${returnedPerson.name}`)
        setType('success')
      })
      .catch(error =>{
        setMessage(error.message)
        setType('error')
      })
    
  }

  const deletePerson = (id) => {
    const person = persons.filter(p => p.id === id)

    if(window.confirm(`delete ${person[0]?.name}?`)){
      personService
      .deletePerson(id)
        .then(res => {
          setPersons(persons.filter(n => n.id !== id))
          // console.log("successful deleted")
          setMessage(`deleted ${person[0]?.name}`)
          setType('success')
        })
        .catch(error => {
          // alert(`person '${id}' was already deleted from server`)
          setPersons(persons.filter(n => n.id !== id))
          setMessage(`information of ${person[0]?.name} has already been removed`)
          setType('error')
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
        setMessage(`Updated ${returnedPerson.name}`)
      })
      .catch(error => {
        // alert(`person '${persons[0]?.name}' was already deleted from server`)
        setPersons(persons.filter(p => p.id !== id))
        setMessage(error.message)
        setType('error')
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
      {message !== '' &&
        <Notification message={message} type={type} />
      }
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