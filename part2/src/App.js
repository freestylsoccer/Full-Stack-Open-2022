import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [weather, setWeater] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesFiltered = useMemo(() => {
    const some = filterCountry !== '' ?
      countries.filter(country => country.name.common.toLowerCase().indexOf(filterCountry.toLocaleLowerCase()) !== -1)
      : []
    return some
  }, [filterCountry, countries])

  useEffect(() => {
    if(countriesFiltered.length === 1) {
      const city = countriesFiltered[0].capital[0]
      const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: city
      }
      axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
          if (!response.data.error) {
              const apiResponse = response.data;
              setWeater(apiResponse)
          } else {
              console.log(`Response error: code: ${response.data.error.code}, info: ${response.data.error.info}`)
          }
      }).catch(error => {
          console.error("An error occurred: ", error);
        })
      }
    }, [countriesFiltered])

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
          <h3>languages</h3>
          <ul>
            {Object.entries(countriesFiltered[0].languages).map(([key, value]) =>
              <li key={key}>{value}</li>
            )}
          </ul>
          <img src={countriesFiltered[0].flags.png} width="250px" alt="flag"/>
          
          <h3>weather in {countriesFiltered[0].capital}</h3>
          <p><strong>temperature:</strong> {weather?.current?.temperature} Celsius</p>
          <img src={weather?.current?.weather_icons} alt="weather icon" />
          <p><strong>wind:</strong> {weather?.current?.wind_speed} {weather?.current?.wind_dir}</p>
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
