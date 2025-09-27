import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  AccessibilityInfo,
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          Delphi
        </Text>
        <Text style={styles.subtitle} accessibilityRole="text">
          Your AI Vision Assistant
        </Text>
      </View>

      {/* Assistant Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.assistantIcon}>
          <Text style={styles.iconText} accessibilityLabel="AI Assistant Icon">
            🤖
          </Text>
        </View>
        <Text style={styles.iconDescription} accessibilityRole="text">
          I'm here to help you see and understand your world
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.chatButton]}
          onPress={handleStartChat}
          accessibilityRole="button"
          accessibilityLabel="Start chatting with the assistant"
          accessibilityHint="Double tap to begin a conversation with the AI assistant"
        >
          <Text style={styles.buttonIcon}>💬</Text>
          <Text style={styles.buttonText}>Start Chatting</Text>
          <Text style={styles.buttonDescription}>
            Ask me questions about anything
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.observationButton]}
          onPress={handleStartObservation}
          accessibilityRole="button"
          accessibilityLabel="Start observing surroundings"
          accessibilityHint="Double tap to begin scanning and describing your environment"
        >
          <Text style={styles.buttonIcon}>👁️</Text>
          <Text style={styles.buttonText}>Observe Surroundings</Text>
          <Text style={styles.buttonDescription}>
            Let me scan and describe your environment
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText} accessibilityRole="text">
          Tap anywhere on the screen to hear this message again
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  assistantIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconText: {
    fontSize: 48,
  },
  iconDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    minHeight: 120,
    justifyContent: 'center',
  },
  chatButton: {
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  observationButton: {
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  buttonIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  buttonDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
  },
});