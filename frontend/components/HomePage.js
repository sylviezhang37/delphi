import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  AccessibilityInfo,
  Image,
} from 'react-native';
import * as Speech from 'expo-speech';
import { enableAccessibilityFeatures, announceScreenChange } from './AccessibilityHelper';

const { width, height } = Dimensions.get('window');

export default function HomePage({ navigation }) {
  // Enable accessibility features
  enableAccessibilityFeatures();

  // Speak welcome message when component mounts
  useEffect(() => {
    announceScreenChange('Home');
    const welcomeMessage = "Welcome to Delphi, your AI-powered vision assistant. I'm here to help you navigate and understand your surroundings. You can start chatting with me or begin observing your environment.";
    Speech.speak(welcomeMessage, {
      language: 'en',
      pitch: 1.0,
      rate: 0.8,
    });
  }, []);

  const handleStartChat = () => {
    Speech.speak("Starting chat mode. You can now ask me questions about your surroundings.", {
      language: 'en',
      pitch: 1.0,
      rate: 0.8,
    });
    navigation.navigate('Chat');
  };

  const handleStartObservation = () => {
    Speech.speak("Starting observation mode. I'll scan your surroundings and describe what I see.", {
      language: 'en',
      pitch: 1.0,
      rate: 0.8,
    });
    navigation.navigate('Observation');
  };

  const handleScreenTouch = () => {
    const welcomeMessage = "Welcome to Delphi, your AI-powered vision assistant. I'm here to help you navigate and understand your surroundings. You can start chatting with me or begin observing your environment.";
    Speech.speak(welcomeMessage, {
      language: 'en',
      pitch: 1.0,
      rate: 0.8,
    });
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handleScreenTouch}
      accessibilityLabel="Tap to hear welcome message again"
      activeOpacity={1}
    >
      {/* Logo Space */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/delphi_rect_logo.png')} 
          style={styles.logo}
          accessibilityLabel="Delphi Logo"
          resizeMode="contain"
        />
      </View>

      {/* Simple Icon in Middle */}
      <View style={styles.iconContainer}>
        <Text style={styles.iconText} accessibilityLabel="AI Assistant Icon">
          🤖
        </Text>
      </View>

      {/* Simple Start Chat Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartChat}
          accessibilityRole="button"
          accessibilityLabel="Start chatting with the assistant"
          accessibilityHint="Double tap to begin a conversation with the AI assistant"
        >
          <Text style={styles.startButtonText}>Start Chat</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
  },
  logoContainer: {
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.33,
    height: (width * 0.33) * 0.4, // Maintain aspect ratio
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 120,
  },
  buttonContainer: {
    paddingBottom: 60,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#497a5b',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: '#497a5b',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#f4b400',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});