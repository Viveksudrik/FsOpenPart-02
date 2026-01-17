import axios from 'axios'
import { useState, useEffect } from 'react'

const CountryDetail = ({ country }) => {
    const [weather, setWeather] = useState(null)

    // Exercise 2.20
    useEffect(() => {
        const apiKey = import.meta.env.VITE_WEATHER_KEY
        if (apiKey) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apiKey}&units=metric`)
                .then(response => {
                    setWeather(response.data)
                })
                .catch(error => {
                    console.error('Error fetching weather:', error)
                })
        }
    }, [country.capital])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>

            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map(lang =>
                    <li key={lang}>{lang}</li>
                )}
            </ul>

            <img src={country.flags.png} alt={country.flags.alt} style={{ width: 150 }} />

            {weather && (
                <div>
                    <h2>Weather in {country.capital}</h2>
                    <div>temperature {weather.main.temp} Celcius</div>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                    <div>wind {weather.wind.speed} m/s</div>
                </div>
            )}
        </div>
    )
}

export default CountryDetail
