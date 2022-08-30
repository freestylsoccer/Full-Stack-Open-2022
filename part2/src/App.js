import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const countriesFiltered = filterCountry !== '' ? 
    countries.filter(country => country.name.common.toLowerCase().indexOf(filterCountry.toLocaleLowerCase()) !== -1)
    : []

  return (
    <>
      <div>
        find countries <input value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} />
      </div>

      {countriesFiltered.length === 1 ? (
        <>
          <h2>{countriesFiltered[0].name.common}</h2>
          <p>capital {countriesFiltered[0].capital}</p>
          <p>population {countriesFiltered[0].population}</p>
          <h2>languages</h2>
          <ul>
            {Object.entries(countriesFiltered[0].languages).map(([key, value]) =>
              <li key={key}>{value}</li>
            )}
          </ul>
          <img src={countriesFiltered[0].flags.png} width="250px" alt="flag"/>
        </>
      ) : countriesFiltered.length <= 10 ? (
        <>
          {countriesFiltered.map(country => 
           <div key={country.name.official}>
              {country.name.common} 
              <button onClick={() => setFilterCountry(country.name.common)}>show</button>
            </div>
          )}
        </>
      ) : (
        <p>Too many matches, specify another filter</p>
      )
      }
    </>
  )
}

export default App
