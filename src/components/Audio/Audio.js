import React from 'react';
import './Audio.css';

const Audio = () => {
  
  const toggleClasses = () => {
    const audioBtn = document.querySelector('.audio-btn');
    const birds = document.querySelector('.birds-container'); 
    audioBtn.classList.toggle('audio-play');
    audioBtn.classList.toggle('audio-pause');
    birds.classList.toggle('birds-container-none');
  }

  const playAudio = () => {
    const audio = document.querySelector('audio');
    const audioBtn = document.querySelector('.audio-btn');
    if(audioBtn.classList.contains('audio-play')) {
      audio.currentTime = 0;
      audio.play();
    } else {
      audio.pause();
    }
    toggleClasses();
  }
  
     
  return (
    <div 
      className="audio-btn audio-play btn" 
      onClick={playAudio}> 
      <i></i>
    <audio src="https://fancy-weather.netlify.com/assets/audio.mp3"
      onEnded={toggleClasses}>     
    </audio>
    </div>
    );
}


export default Audio;