import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        const filtered = allCountries.filter(c =>
          c.name.common.toLowerCase().includes(query.toLowerCase())
        )
        setCountries(filtered)
      } else {
        setCountries([])
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [query, allCountries])


  const handleSearch = (event) => {
    setQuery(event.target.value)
  }

  const showCountry = (name) => {
    setQuery(name)
  }

  return (
    <div>
      <div>
        find countries <input value={query} onChange={handleSearch} />
      </div>
      <CountryList countries={countries} showCountry={showCountry} />
    </div>
  )
}

export default App
