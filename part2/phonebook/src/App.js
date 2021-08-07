import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const nameChanged = (event) => setNewName(event.target.value)
  const numberChanged = (event) => setNewNumber(event.target.value)
  const filterChanged = (event) => setNewFilter(event.target.value)
  const addPerson = (event) => {
    event.preventDefault()
    const findPerson = persons.find(p => p.name === newName)

    if (!findPerson) {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(response => setPersons(persons.concat(response)))
      setNewName('')
      setNewNumber('')
    }
    else {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        const id = findPerson.id
        const newPerson = { ...findPerson, number: newNumber }
        personService
          .update(id, newPerson)
          .then(response => setPersons(persons.map(p => p.id !== id ? p : newPerson)))
      }
    }
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

      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons} />
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

const Persons = ({ persons, newFilter, setPersons }) => {
  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .remove(id)
        .then(response => {
          if (response === 200) {
            setPersons(persons.filter(n => n.id !== id))
          }
        })
        .catch(error => console.log(error))
    }
  }

  return (
    <>
      {personsToShow.map((person) =>
        <p key={person.name}>
          {person.name} {person.number} <button onClick={() => { deletePerson(person.id, person.name) }}>delete</button>
        </p>
      )}
    </>
  )
}
