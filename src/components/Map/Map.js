import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import './Map.css';


const YandexMap = ({lang, latitude, longitude}) => {
  
  const mapStyle = {
    opacity: lang === 'en' ? '1' : '0',
    pointerEvents: lang === 'en' ? 'auto' : 'none',
    transition: '1s'    
  }
  
 return (
   <>
   <YMaps query={{ lang: 'ru' }}>
    <Map className="map" state={{ center: [latitude, longitude], zoom: 11 }} />
  </YMaps>
   <YMaps query={{ lang: 'en' }}>
    <Map className="map" state={{ center: [latitude, longitude], zoom: 11 }} style={mapStyle}/>
  </YMaps>
   </>
  );
};

export default YandexMap;