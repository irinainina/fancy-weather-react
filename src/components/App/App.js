import React, {Component} from 'react';
import './App.css';
import BgImage from '../BgImage/BgImage';
import Lang from '../Lang/Lang';
import TempScale from '../TempScale/TempScale';
import Audio from '../Audio/Audio';
import Birds from '../Birds/Birds';
import Search from '../Search/Search';
import Location from '../Location/Location';
import Time from '../Time/Time';
import Weather from '../Weather/Weather';
import Forecast from '../Forecast/Forecast';
import YandexMap from '../Map/Map';
import Coordinates from '../Coordinates/Coordinates';

class App extends Component {
  state = {
    date: new Date(),
    loc: '',
    lat: '', 
    lon: '',
    lang: 'en',
    timeZone: 'Europe/Kiev',
    tempScale: 'C',
    weather: '',
    month: '',
    day: '',
    hour: '',
    weekday: '',
    place: '',
    currentTemperature: '',
    summary: '',
    apparentTemperature: '',
    windSpeed: '',
    humidity: '',
    weatherIconId: '',
    weatherIconIcon: '',
    nextDays: [],
    latitude: 53.9,
    longitude: 27.56667
  };

  componentDidMount() {
    this.dateToState();
    this.getCurrentLocation();
    this.setState({
      lang: localStorage.getItem('lang'),
      tempScale: localStorage.getItem('tempScale')
    });
  }

  dateToState = () => {
    const date = this.state.date;
    const month = date.toLocaleString('en-GB', {
      month: 'numeric',
      timeZone: this.state.timeZone
    }) - 1;

    const day = date.toLocaleString('en-GB', {
      day: 'numeric',
      timeZone: this.state.timeZone
    });

    const hour = date.toLocaleString('en-GB', {
      hour: 'numeric',
      timeZone: this.state.timeZone
    });

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdayName = date.toLocaleString('en-GB', {
      weekday: 'long',
      timeZone: this.state.timeZone
    });
    const weekdayNum = weekdays.indexOf(weekdayName);

    this.setState({
      month,
      day,
      hour,
      weekday: weekdayNum
    });
  }

  getCurrentLocation = async () => {
    const url = 'https://ipinfo.io/json?token=2699d346d0bdb9';
    const res = await fetch(url);
    const data = await res.json();
    this.setState({
      loc: data.loc,
      lat: data.loc.split(',')[0],
      lon: data.loc.split(',')[1],
      timeZone: data.timezone,
      latitude: data.loc.split(',')[0],
      longitude: data.loc.split(',')[1]
    });
    this.getLocationPlace(data.loc, this.state.lang);
    this.getLocationWeather(this.state.lat, this.state.lon, this.state.lang);
  }

  getSearchValueCoordinates = async (event) => {
    //event.preventDefault();
    const searchInput = document.querySelector('.search-input');
    const searchValue = searchInput.value;
    if (searchValue.length < 2) {
      this.getCurrentLocation();
      return;
    }
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${searchValue}&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.results[0]) return;
    this.state.timeZone = data.results[0].annotations.timezone.name;
    const coordsArr = data.results[0].geometry;
    const coordsStr = `${coordsArr.lat},${coordsArr.lng}`;
    this.state.loc = coordsStr;
    this.state.lat = coordsArr.lat;
    this.state.lon = coordsArr.lng;
    this.getLocationPlace(this.state.loc, this.state.lang);
    this.getLocationWeather(this.state.lat, this.state.lon, this.state.lang);
    this.dateToState();
    this.setState({
      latitude: coordsArr.lat,
      longitude: coordsArr.lng
    });
  }

  getLocationPlace = async (loc, lang) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${loc}&key=c6b6da0f80f24b299e08ee1075f81aa5&language=${lang}&pretty=1`;
    const res = await fetch(url);
    const data = await res.json();
    const city = data.results[0].components.city ||
      data.results[0].components.town || data.results[0].components.village || data.results[0].components.county || data.results[0].components.state;
    const {
      country
    } = data.results[0].components;
    const place = `${city}, ${country}`;
    this.setState({
      place: place
    });
  }

  // weatherToState = (data) => {
  //   const summaryArr = data.split('-');
  //   const summaryWeather = summaryArr.length === 3 ?
  //     summaryArr[1] : summaryArr[0];
  //   this.setState({
  //     weather: summaryWeather
  //   });
  // }

  switchTempScale = (temperature, tempScale) => {
    let switchTemp = 0;
    if (tempScale === 'C') {
      switchTemp = temperature.toFixed(0);
    } else {
      switchTemp = (temperature * 9 / 5 + 32).toFixed(0);
    }
    return switchTemp;
  }

  viewLocationWeather(data) {    
    const currentTemperature = this.switchTempScale(data.list[0].main.temp, this.state.tempScale);
    const summary = data.list[0].weather[0].description;
    const apparentTemperature = this.switchTempScale(data.list[0].main.feels_like, this.state.tempScale);
    const windSpeed = data.list[0].wind.speed.toFixed(0);
    const humidity = `${data.list[0].main.humidity.toFixed(0)}%`;
    const weatherIconId = data.list[0].weather[0].id;
    const weatherIconIcon = data.list[0].weather[0].icon;
    
    this.setState({
      currentTemperature,
      summary,
      apparentTemperature,
      windSpeed,
      humidity,
      weatherIconId,
      weatherIconIcon
    });
  }

  viewForecast = (data) => {
    const nextDays = [];

    for (let i = 1; i <= 3; i++) {
      const nextDay = {};
      const dayTemperature = data.list[i*8].main.temp.toFixed(0);
      const dayIconId = data.list[i*8].weather[0].id;
      const dayIconIcon = data.list[i*8].weather[0].icon;
      const dayWeekdayNum = (this.state.weekday + i) % 7;

      nextDay.temperature = dayTemperature;
      nextDay.iconId = dayIconId;
      nextDay.iconIcon = dayIconIcon;
      nextDay.weekday = dayWeekdayNum;

      nextDays.push(nextDay)
    }
    this.setState({
      nextDays
    });
  }

  getLocationWeather = async (lat, lon, lang) => {    
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=${lang}&units=metric&appid=a9a3a62789de80865407c0452e9d1c27`;
    const res = await fetch(url);
    const data = await res.json();
    this.viewLocationWeather(data);
    this.viewForecast(data);
  }

  convertCelsiusToFahrenheit(temp, scale) {
    let tempValue = 0;
    if (scale === 'F') {
      tempValue = ((temp - 32) * 5 / 9).toFixed(0);
    } else {
      tempValue = (temp * 9 / 5 + 32).toFixed(0);
    }
    return tempValue;
  }

  onTempChange = (tempScale) => {
    if (this.state.tempScale === tempScale) return;
    const newApparentTemperature = this.convertCelsiusToFahrenheit(this.state.apparentTemperature, this.state.tempScale);
    const newCurrentTemperature = this.convertCelsiusToFahrenheit(this.state.currentTemperature, this.state.tempScale);
    const newDayTemperatures = this.state.nextDays.map(el => el.temperature = this.convertCelsiusToFahrenheit(el.temperature, this.state.tempScale));

    this.setState({
      tempScale,
      currentTemperature: newCurrentTemperature,
      apparentTemperature: newApparentTemperature,
      dayTemperatures: newDayTemperatures
    });
    localStorage.setItem('tempScale', tempScale);
  }

  onLangChange = (lang) => {
    this.setState({
      lang
    });
    this.getLocationPlace(this.state.loc, lang);
    this.getLocationWeather(this.state.lat, this.state.lon, lang);
    localStorage.setItem('lang', lang);
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="header-btns">
            <BgImage 
              lang={this.state.lang}
              loc={this.state.loc}
              tempScale={this.state.tempScale}
              weather={this.state.weather}
              month={this.state.month} hour={this.state.hour} />
            <Lang 
              lang={this.state.lang}
              onLangChange={this.onLangChange}/>
            <TempScale 
              tempScale={this.state.tempScale}
              onTempChange={this.onTempChange}/>
            <Audio />
          </div>
          <Search 
          lang={this.state.lang}
          getSearchValueCoordinates={this.getSearchValueCoordinates} /> 
        </header>      
        <main className="main">
          <div className="location">
            <Location 
              place={this.state.place} />
            <Time 
              lang={this.state.lang}
              timeZone={this.state.timeZone}
              month={this.state.month}
              day={this.state.day}
              weekday={this.state.weekday} />
            <Weather 
              currentTemperature={this.state.currentTemperature}
              lang={this.state.lang}
              summary={this.state.summary}
              apparentTemperature={this.state.apparentTemperature}
              windSpeed={this.state.windSpeed}
              humidity={this.state.humidity}
              weatherIconId={this.state.weatherIconId}
              weatherIconIcon={this.state.weatherIconIcon} />
            <Forecast 
              lang={this.state.lang}
              nextDays={this.state.nextDays} />
          </div>      
          <div className="geolocation">
            <YandexMap  
               lang={this.state.lang}
               latitude={this.state.latitude}
               longitude={this.state.longitude} /> 
            <Coordinates 
              lang={this.state.lang}
              latitude={this.state.latitude}
              longitude={this.state.longitude} />
          </div>
        </main>      
        <Birds />
      </div>
    );
  }
}

export default App;