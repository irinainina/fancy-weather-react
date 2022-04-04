import React, { Component } from 'react';
import './TempScale.css';

class TempScale extends Component {
  
  state = {
    tempScale: this.props.tempScale
  }
  
  toggleActiveClass = (event) => {
    const {onTempChange = () => {}} = this.props;
        
    const tempScale = event.target.textContent.slice(1);
    this.setState({
      tempScale
    });    
    onTempChange(tempScale);
  }
  
  render() { 
    let classNamesF = 'temp-btn temp-btn-f btn'; 
    let classNamesC = 'temp-btn temp-btn-c btn'; 

    if (this.props.tempScale === 'C') {
      classNamesC += ' temp-btn-active';
    } else {
      classNamesF += ' temp-btn-active';
    }
    
    return (
      <div className="temp-btns"
        onClick={this.toggleActiveClass}>
        <div className={classNamesF} data-scale="F">
          °F
          <i></i>
        </div>
        <div className={classNamesC} data-scale="C">
          °C
          <i></i>
        </div>
      </div>
      );
  }
}

export default TempScale;