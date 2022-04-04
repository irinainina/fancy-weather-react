import React, { Component } from 'react';
import './Lang.css';

class Lang extends Component {

 state = {    
  lang: this.props.lang
 }

 toggleLang = (event) => {
   const {onLangChange = () => {}} = this.props;
   const lang = event.target.options[event.target.selectedIndex].text;
   this.setState({
      lang
    });
   onLangChange(lang);
 }

  render() {    
    return (
      <div className="lang-btn btn">
        <i></i>
        <select onChange={this.toggleLang} value={this.props.lang}>
          <option>en</option>
          <option>ru</option>
          <option>be</option>
        </select>
      </div>
      );
  }
}

export default Lang;