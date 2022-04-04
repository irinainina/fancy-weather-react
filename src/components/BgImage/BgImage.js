import React, { Component } from 'react';
import './BgImage.css';

class BgImage extends Component {
    
  componentDidUpdate(prevProps) {
    if (this.props.loc !== prevProps.loc) {
    this.getFlickrImage();
    }
  }  
  
  viewBgImage = (data) => {
    const html = document.querySelector('html');
    const src = data;
    const img = document.createElement("img");
    img.onload = () => {      
      html.style.background = `url(${src}) center center / cover no-repeat, linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55))`;
    };
    img.src = src;
  }
  
  searchImageSeason = (month, location='0') => {
    let season;
    const hemisphere = location[0] === '-' ? 'south' : 'north';
    if(hemisphere === 'north') {
      if (month > 2 && month < 6) {
        season = 'spring';
      } else if (month > 5 && month < 9) {
        season = 'summer';
      } else if (month > 8 && month < 12) {
        season = 'autumn';
      } else {
        season = 'winter';
      }
    } else if (month > 2 && month < 6) {
        season = 'autumn';
      } else if (month > 5 && month < 9) {
        season = 'winter';
      } else if (month > 8 && month < 12) {
        season = 'spring';
      } else {
        season = 'summer';
      }
    return season;
  }
  
  searchImagePeriod = (hour) => {
    let period;
    if(hour > 5 && hour < 13) {
      period = 'morning'
    } else if(hour > 12 && hour < 18) {
      period = 'afternoon'
    } else if(hour > 17 && hour < 24) {
      period = 'evening'
    } else {
      period = 'night'
    } 
    return period;
  }

  searchImageRequest = () => {
    const season = this.searchImageSeason(this.props.month);
    const period = this.searchImagePeriod(this.props.hour);
    const weather = this.props.weather;
    const imageRequest = `nature,${season},${period},${weather}`;
    return imageRequest;
  }

  randomInteger = (min, max) => {
    const rand = min + Math.random() * (max - min);
    return Math.round(rand);
  }

  getFlickrImage = async () => { 
    const request = this.searchImageRequest();
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tags=${request}&tag_mode=all&per_page=400&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();   
    const dataFilter = data.photos.photo.filter(img => 
      typeof img.url_l !== 'undefined'
    );
    const imgNum = this.randomInteger(0, dataFilter.length);
    this.viewBgImage(dataFilter[imgNum].url_l);
    
    
  }  
  render() {    
    return (
      <div className="reload-btn btn"
           onClick={this.getFlickrImage}>
        <i></i>
      </div>
      );
  }
}

export default BgImage;