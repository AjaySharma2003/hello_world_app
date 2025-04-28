// ./src/utils/BackgroundMusic.js
import React, { useEffect } from 'react';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';

const BackgroundMusic = () => {
  var mySound = new Sound('background.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Error loading sound: ' + error);
      return;
    } else {
      mySound.play((success) => {
        if (success) {
          console.log('Sound playing')
        } else {
          console.log('Issue playing file');
        }
      })
    }
  });
  mySound.setVolume(0.9);
  mySound.release();

  // This component does not render any UI
  return null;
};

export default BackgroundMusic;
