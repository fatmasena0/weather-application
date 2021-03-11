import { useEffect, useState } from 'react'
import './App.scss'

import WeatherCard from './components/WeatherCard/WeatherCard'
import NextDays from './components/NextDays/NextDays'

import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

const App = () => {
  const [location, setLocation] = useState('Istanbul')
  const [weatherInfo, setWeatherInfo] = useState({})
  const [city, setCity] = useState('')
  const [step, setStep] = useState('')
  const [tempBool, setTempBool] = useState(false)
  const [temp, setTemp] = useState('')

  const params = {
    key: '8791447412b9426f9f245251211003',
    location,
    step
  }

  const marks = [
    {
      value: 3,
      label: '03:00'
    },
    {
      value: 6,
      label: '06:00'
    },
    {
      value: 9,
      label: '09:00'
    },
    {
      value: 12,
      label: '12:00'
    },
    {
      value: 15,
      label: '15:00'
    },
    {
      value: 18,
      label: '18:00'
    },
    {
      value: 21,
      label: '21:00'
    }
  ]

  const today = new Date()
  let hour = today.getHours()

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${params.key}&q=${params.location}&days=7`)
      .then(response => response.json())
      .then(data => setWeatherInfo(data))
    setTempBool(false)
    setStep(hour)
  }, [location, params.key, params.location, hour])

  useEffect(() => {
    if (weatherInfo.forecast) {
      setTemp(weatherInfo.forecast.forecastday[0].hour[step].temp_c)
    }
  }, [step, weatherInfo.forecast])

  return (
    <div className='weather-wrapper'>
      <input
        className='input'
        onKeyDown={(event) => event.keyCode === 13 ? setLocation(city) : null}
        onChange={(event) => {
          setCity(event.target.value)
        }}
        onBlur={() => setLocation(city)}
        placeholder='Search a city...'
      />
      {weatherInfo.current && (
        <WeatherCard
          currentHour={step}
          temp={temp}
          tempBool={tempBool}
          icon={weatherInfo.current.condition.icon}
          current={weatherInfo.current.temp_c}
          name={weatherInfo.location.name}
          condition={weatherInfo.current.condition.text}
          forecast={weatherInfo.forecast}
          date={weatherInfo.forecast.forecastday[0].date}

        />
      )}
      <div className='slidebar'>
        <Typography id='discrete-slider-small-steps' gutterBottom>
          Hourly Forecast
        </Typography>
        <Slider
          onChange={(e, val) => {
            setStep(val)
            setTempBool(true)
          }}
          defaultValue={hour}
          step={1}
          marks={marks}
          min={0}
          max={23}
          valueLabelDisplay='auto'
        />
      </div>

      <div className='next-days'>
        {weatherInfo.current && (
          <>
            <NextDays
              minTemp={weatherInfo.forecast.forecastday[0].day.mintemp_c}
              maxTemp={weatherInfo.forecast.forecastday[0].day.maxtemp_c}
              icon={weatherInfo.forecast.forecastday[0].day.condition.icon}
              forecast={weatherInfo.forecast}
              date={weatherInfo.forecast.forecastday[0].date}
            />
            <NextDays
              minTemp={weatherInfo.forecast.forecastday[1].day.mintemp_c}
              maxTemp={weatherInfo.forecast.forecastday[1].day.maxtemp_c}
              icon={weatherInfo.forecast.forecastday[1].day.condition.icon}
              forecast={weatherInfo.forecast}
              date={weatherInfo.forecast.forecastday[1].date}
            />
            <NextDays
              minTemp={weatherInfo.forecast.forecastday[2].day.mintemp_c}
              maxTemp={weatherInfo.forecast.forecastday[2].day.maxtemp_c}
              icon={weatherInfo.forecast.forecastday[2].day.condition.icon}
              forecast={weatherInfo.forecast}
              date={weatherInfo.forecast.forecastday[2].date}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
