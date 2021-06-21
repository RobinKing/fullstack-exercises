import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (-1 === persons.findIndex((p) => p.name === newName)) {
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    }
    else
      alert(`${newName} is already added to phonebook`)
  }

return (
  <div>
    <h2>Phonebook</h2>
    <form>
      <div>
        name: <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={addPerson}
        >add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    {persons.map((person) => (
      <li key={person.name}>{person.name}</li>
    )
    )}
  </div>
)
}

export default App