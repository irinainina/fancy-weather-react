import React from 'react';
import './Forecast.css';
import * as icons from '../weatherIcons';
import {weekdays} from '../translate';

const Forecast = ({lang, nextDays}) => {
  
 const createIcon = (iconId, iconIcon) => {
    return {__html: icons.weatherIcons(iconId, iconIcon)};
  }
 
 const elements = nextDays.map((nextDay, index) => {
   return (
    <div className="nextday" key={index}>
      <p className="day">
          {`${weekdays[nextDay.weekday][lang]}`}
      </p>
      <p className="day-temperature">
        <span className="nextday-temperature">
          {nextDay.temperature}°
        </span>
        <span className="nextday-icon"
          dangerouslySetInnerHTML={createIcon(nextDay.iconId, nextDay.iconIcon)}>
        </span>
      </p>
    </div>
   )
 })
 
    return (
      <div className="location-forecast">
        {elements}
      </div>
      );
}

export default Forecast;