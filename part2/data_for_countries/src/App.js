import React, { useState, useEffect } from "react"
import axios from 'axios'

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt="flag" height="200"></img>
    </>
  )
}

const Countries = ({ countries, filter }) => {
  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )
  // console.log(countriesToShow)
  if (countriesToShow.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countriesToShow.length > 1) {
    return (
      <>
        {countriesToShow.map(country =>
          <p>{country.name}</p>
        )}
      </>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <>
        <Country country={countriesToShow[0]} />
      </>
    )
  } else {
    return (
      <>Not find</>
    )
  }
}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <form>
      find countries <input value={filter}
        onChange={handleFilterChange} />
    </form>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => (setFilter(event.target.value))
  // ...
  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} />
    </>
  )
}

export default App
