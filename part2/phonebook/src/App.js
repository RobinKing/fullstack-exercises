import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (-1 === persons.findIndex((p) => p.name === newName)) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else
      alert(`${newName} is already added to phonebook`)
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  console.log(personsToShow);

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={newFilter}
        onChange={(event) => setNewFilter(event.target.value)} />
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName}
            onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit"
            onClick={addPerson}
          >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App