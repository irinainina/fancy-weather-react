import React from 'react';
import './Location.css';

const Location = ({place}) => {
  
  return (
    <p className="location-place">
    <span>{place}</span> 
    </p>
    );
}


export default Location;