import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import CameraSection from '../components/CameraSection';
import SettingsModal from '../components/SettingsModal';
import CameraHelpModal from '../components/CameraHelpModal';
import speechService from '../services/SpeechService';
import * as Haptics from 'expo-haptics';

const MainScreen = ({ navigation }) => {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const [description, setDescription] = useState('');

  // Announce instructions on screen mount
  useEffect(() => {
    const instructionMessage =
      "You're on the camera screen. You can take a photo of your surroundings, and we'll tell you what's there.";
    speechService.speak(instructionMessage);
  }, []);

  //   // Called after user takes a photo
  //   const capturePhoto = () => {
  //     // simulate environment analysis
  //     const mockDescription = "I can see you're in a room with furniture. There appears to be a table in the center, chairs around it, and a window letting in natural light. The room looks organized and well-lit.";
  //     setDescription(mockDescription);
  //     speechService.speak(mockDescription);
  //   };

  const repeatDescription = () => {
    if (description) {
      speechService.speak(description);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 16, color: '#f4b400', fontWeight: '600' }}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setHelpVisible(true);
          }}
        >
          <Text style={styles.helpButtonText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsButton} onPress={() => setSettingsVisible(true)}>
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Camera Section */}
      <View style={styles.cameraContainer}>
        <CameraSection navigation={navigation} />
      </View>

      {/* Repeat Description Button */}
      {description && (
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={[styles.button, styles.speakButton]} onPress={repeatDescription}>
            <Text style={styles.buttonText}>🔊 Repeat Description</Text>
          </TouchableOpacity>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>What I see:</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
        </View>
      )}

      {/* Modals */}
      <SettingsModal visible={settingsVisible} onClose={() => setSettingsVisible(false)} />
      <CameraHelpModal visible={helpVisible} onClose={() => setHelpVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 100,
  },

  topButtonsContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1000,
  },

  backButton: { padding: 5 },

  helpButton: {
    backgroundColor: '#f4b400',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#f4b400',
  },

  helpButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'medium',
  },

  settingsButton: {
    backgroundColor: '#f4b400',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#f4b400',
  },

  settingsButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'medium',
  },

  cameraContainer: { flex: 1 },

  controlsContainer: {
    backgroundColor: '#fff',
    padding: 20,
  },

  instructionOverlay: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
  },

  instructionText: {
    textAlign: 'center',
    color: '#497a5b',
    fontSize: 16,
  },

  button: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },

  speakButton: {
    backgroundColor: '#497a5b',
    borderWidth: 1,
    borderColor: '#f4b400',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  descriptionContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },

  descriptionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#497a5b',
    marginBottom: 5,
  },

  descriptionText: {
    fontSize: 14,
    color: '#497a5b',
  },
});

export default MainScreen;
