import React from 'react';
import './Search.css';
import dictionary from '../translate';

const Search = ({getSearchValueCoordinates, lang}) => {
  
  const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
  const rec = new SpeechRecognition();
  const voice = document.querySelector('.voice');
  const searchInput = document.querySelector('.search-input');
  
  const voiceSearch = (event) => {
    event.target.classList.toggle('voice-active');
    if(event.target.classList.contains('voice-active')) {
      rec.start();
    } else {
      rec.stop();
      searchInput.value = '';
    } 
  }
  
  rec.addEventListener('result', (e) => {
    const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    searchInput.value = text;
    getSearchValueCoordinates();
  });

  rec.addEventListener('end', () => {
    if(voice.classList.contains('voice-active')) {
      rec.start();
    }
  });
  
  return (
    <form className="search-panel"
      onSubmit={(e) => {getSearchValueCoordinates(); e.preventDefault();}}>
      <input className="search-input"
        type="text"
        name="city"
        placeholder={`${dictionary[0][lang]}`}
        autoComplete="off"/>
      <div className="voice"
        onClick={voiceSearch}>
      </div>        
      <button className="search-button btn">
        {`${dictionary[1][lang]}`}
        <i></i>
      </button>
    </form>
    );
}


export default Search;