import React from 'react';
import './Weather.css';
import * as icons from '../weatherIcons';
import dictionary from '../translate';

const Weather = ({currentTemperature, lang, summary, apparentTemperature, windSpeed, humidity, weatherIconId, weatherIconIcon}) => {
     
  const createIcon = (iconId, iconIcon) => {
    return {__html: icons.weatherIcons(iconId, iconIcon)};
  }

  return (
    <div className="location-weather">
      <p className="location-temperature"> 
        <span className="current-temperature">
          {currentTemperature}
        </span>
        <span className="location-degree">°
          <span className="location-icon"
           dangerouslySetInnerHTML={createIcon(weatherIconId, weatherIconIcon)}> 
          </span>   
        </span>
      </p>
      <div className="location-details">
        <p className="summary">
          {summary}
        </p>
        <p className="apparent-temperature">
          <span className="apparent-text">
            {`${dictionary[2][lang]}`}
          </span>
          <span className="apparent-value">
            {apparentTemperature}°
          </span>
        </p>
        <p className="wind-speed">
          <span className="wind-text">
            {`${dictionary[3][lang]}`}
          </span>
          <span className="wind-value">
            {windSpeed}
          </span>
          <span className="wind-units">
            {`${dictionary[4][lang]}`}
          </span> 
        </p>
        <p className="humidity">          
          <span className="humidity-text">
            {`${dictionary[5][lang]}`}
          </span>
          <span className="humidity-value">
            {humidity} 
          </span>
        </p>
      </div>
    </div>
    );
}

export default Weather;