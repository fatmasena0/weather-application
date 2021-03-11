import React from "react";
import './WeatherCard.scss'

const WeatherCard = ({ current, currentHour, tempBool, icon, temp, name, condition, forecast, date }) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let d = new Date(date);
  let dayName = days[d.getDay()];
  const addZ = (n) => { return n < 10 ? ('0' + n + ':00') : (`${n}:00`) };

  return (
    <div className='weather-card'>


      <img className='weather-icon' src={icon} alt='asdsadas' />
      {
        tempBool ?
          <>
            <h1>{temp} <span className="degree" >&deg;C</span></h1>
            <p>{addZ(currentHour)}</p>
          </>
          :
          <h1>{current} <span className="degree" >&deg;C</span></h1>
      }

      <p>{name} | <span>{condition}</span></p>
      <h2>
        {forecast && (
          <p>{dayName} | <span>{date}</span></p>
        )}
      </h2>


    </div>
  )
}
export default WeatherCard
