import React from 'react';
import './Coordinates.css';
import dictionary from '../translate';

const Coordinates = ({latitude, longitude, lang}) => {
  function convertCoordinates(coordinate) {
    const absCoord = Math.abs(coordinate);
    const coordDeg = Math.floor(absCoord);
    const coordMin = (Math.floor((absCoord - coordDeg) * 60));
    const coordSign = ((coordinate > 0) ? '' : '-');

    return `${coordSign}${coordDeg}°${coordMin}'`;
  }
  
  return (
    <div className="coordinates">
      <p className="latitude">           
        <span className="latitude-text">
          {`${dictionary[6][lang]}`} 
        </span>
        <span className="latitude-value">{convertCoordinates(latitude)}</span>
      </p>
      <p className="longitude">           
        <span className="longitude-text">
          {`${dictionary[7][lang]}`}
        </span>
        <span className="longitude-value">{convertCoordinates(longitude)}</span>
      </p>
    </div>
    );
}

export default Coordinates;