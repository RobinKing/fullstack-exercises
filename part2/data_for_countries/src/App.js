import React, { useState, useEffect } from "react"
import axios from 'axios'

const Country = ({ country }) => {
  if (country.length === 0)
    return (<></>)
  else {
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
        <Weather city={country.capital} />
      </>
    )
  }
}

const Weather = ({ city }) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios.get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + city)
      .then(response => {
        setWeather(response.data)
      })
  }, [city])
  if (weather.length === 0)
    return (<></>)
  else {
    console.log(weather)
    return (
      <>
        <h2>Weather in {city}</h2>
        <p>temperature: {weather.current.temperature}</p>
        <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]}></img>
        <p>wind:{weather.current.wind_speed} direction {weather.current.wind_dir}</p>
      </>
    )
  }
}

const Button = ({ country, setCountryToShow }) => {
  return (
    <>
      <button onClick={() => setCountryToShow(country)}>show</button>
    </>
  )
}

const Countries = ({ countries, filter, setCountryToShow }) => {
  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  if (countriesToShow.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countriesToShow.length > 1) {
    return (
      <>
        {countriesToShow.map(country =>
          <p key={country.name}>{country.name}<Button country={country} setCountryToShow={setCountryToShow} /></p>
        )}
      </>
    )
  } else if (countriesToShow.length === 1) {
    setCountryToShow(countriesToShow[0])
    return (
      <>
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
  const [countryToShow, setCountryToShow] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setCountryToShow([])
    setFilter(event.target.value)
  }

  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} setCountryToShow={setCountryToShow} />
      <Country country={countryToShow} />
    </>
  )
}

export default App
