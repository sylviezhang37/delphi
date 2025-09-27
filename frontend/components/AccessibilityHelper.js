import { useEffect } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';
import * as Speech from 'expo-speech';

export const enableAccessibilityFeatures = () => {
  useEffect(() => {
    // Enable screen reader support
    if (Platform.OS === 'android') {
      AccessibilityInfo.setAccessibilityFocus();
    }
  }, []);
};

export const speakWithDelay = (text, delay = 0) => {
  setTimeout(() => {
    Speech.speak(text, {
      language: 'en',
      pitch: 1.0,
      rate: 0.8,
      quality: 'enhanced',
    });
  }, delay);
};

export const announceScreenChange = (screenName) => {
  speakWithDelay(`Now on ${screenName} screen`, 500);
};

export const announceButtonPress = (buttonName) => {
  speakWithDelay(`${buttonName} button pressed`, 100);
};

export const announceError = (errorMessage) => {
  speakWithDelay(`Error: ${errorMessage}`, 200);
};

export const announceSuccess = (successMessage) => {
  speakWithDelay(`Success: ${successMessage}`, 200);
};