import React from 'react';
import './NextDays.scss'

const NextDays = ({ icon, minTemp, maxTemp, forecast, date }) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let d = new Date(date)
  let dayName = days[d.getDay()]

  return (
    <div className='next-weather-card'>
      <img className='weather-icon' src={icon} alt='asdsadas' />
      <h1>{Math.round(maxTemp)}&deg;C <br /> {Math.round(minTemp)}&deg;C</h1>
      <h2>
        {forecast && (
          <p>{dayName} <br /><span>{date}</span></p>
        )}
      </h2>

    </div>
  )
}
export default NextDays
