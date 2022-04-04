import React, { Component } from 'react';
import './Time.css';
import {weekdaysShort, months} from '../translate';

class Time extends Component {
  
  state = {
    time: ''
  };

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.getCurrentTime(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getCurrentTime() {
    this.setState({
      time: new Date().toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: this.props.timeZone})
    });
  }
  
  render() {    
    return (
      <div className="location-date">
        <span className="location-day">
          {`${weekdaysShort[+this.props.weekday][this.props.lang]} 
            ${this.props.day} 
            ${months[+this.props.month][this.props.lang]}`  }
        </span>
        <span className="location-time">
          {this.state.time}
        </span>
      </div>
      );
  }
}

export default Time;