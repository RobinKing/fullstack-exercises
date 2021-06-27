import React, {useState, useEffect} from "react"
import axios from 'axios'

const App = () => {
  axios.get('https://restcountries.eu/rest/v2/all').then(response => {
    const countries = response.data
    console.log(countries)
  })
  // ...
  return (
    <h1>aa</h1>
  )
}

export default App
