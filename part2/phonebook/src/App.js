import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(resolve => {
      const persons = resolve.data
      setPersons(persons)
    })
  }, [])

  const nameChanged = (event) => setNewName(event.target.value)
  const numberChanged = (event) => setNewNumber(event.target.value)
  const filterChanged = (event) => setNewFilter(event.target.value)
  const addPerson = (event) => {
    event.preventDefault()

    if (-1 === persons.findIndex((p) => p.name === newName)) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      axios.post('http://localhost:3001/persons', personObject)
      .then(response => 
        setPersons(persons.concat(response.data))
      )
//      setPersons(persons.concat(personObject))
//      setNewName('')
//      setNewNumber('')
    }
    else
      alert(`${newName} is already added to phonebook`)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleChange={filterChanged} />

      <h2>add a new</h2>

      <PersonForm newName={newName} handleNameChange={nameChanged}
        newNumber={newNumber} handleNumbeChange={numberChanged}
        handleAddPerson={addPerson} />

      <h2>Numbers</h2>

      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App

const Filter = ({ newFilter, handleChange }) => {
  return (
    <p>
      filter shown with <input value={newFilter}
        onChange={handleChange} />
    </p>
  )
}

const PersonForm = ({ newName, handleNameChange, newNumber, handleNumbeChange, handleAddPerson }) => {
  return (
    <form>
      <div>
        name: <input value={newName}
          onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber}
          onChange={handleNumbeChange} />
      </div>
      <div>
        <button type="submit"
          onClick={handleAddPerson}
        >add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, newFilter }) => {
  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <>
      {personsToShow.map((person) =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </>
  )
}
