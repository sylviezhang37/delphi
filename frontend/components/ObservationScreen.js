import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Speech from 'expo-speech';

const { width, height } = Dimensions.get('window');

export default function ObservationScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    getCameraPermissions();
  }, []);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    
    if (status !== 'granted') {
      Alert.alert(
        'Camera Permission Required',
        'Delphi needs camera access to scan your surroundings. Please enable camera permissions in your device settings.',
        [{ text: 'OK' }]
      );
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    Speech.speak("Starting to scan your surroundings. Please hold the camera steady.", {
      language: 'en',
      pitch: 1.0,
      rate: 0.8,
    });

    // Simulate scanning process (replace with actual Gemini API call)
    setTimeout(() => {
      const mockDescription = "I can see you're in a room with furniture. There appears to be a table in the center, chairs around it, and what looks like a window with natural light coming in. The room seems well-lit and organized.";
      setDescription(mockDescription);
      setIsScanning(false);
      
      Speech.speak(mockDescription, {
        language: 'en',
        pitch: 1.0,
        rate: 0.7,
      });
    }, 3000);
  };

  const stopScanning = () => {
    setIsScanning(false);
    Speech.speak("Scanning stopped.", {
      language: 'en',
      pitch: 1.0,
      rate: 0.8,
    });
  };

  const speakDescription = () => {
    if (description) {
      Speech.speak(description, {
        language: 'en',
        pitch: 1.0,
        rate: 0.7,
      });
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera access is required for this feature.</Text>
        <TouchableOpacity style={styles.button} onPress={getCameraPermissions}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back to home"
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Environment Scanner</Text>
      </View>

      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={(ref) => {
            this.camera = ref;
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.scanningArea}>
              <Text style={styles.instructionText}>
                {isScanning ? 'Scanning...' : 'Point camera at your surroundings'}
              </Text>
            </View>
          </View>
        </Camera>
      </View>

      <View style={styles.controlsContainer}>
        {!isScanning ? (
          <TouchableOpacity
            style={[styles.button, styles.scanButton]}
            onPress={startScanning}
            accessibilityLabel="Start scanning surroundings"
          >
            <Text style={styles.buttonIcon}>👁️</Text>
            <Text style={styles.buttonText}>Start Scanning</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={stopScanning}
            accessibilityLabel="Stop scanning"
          >
            <Text style={styles.buttonIcon}>⏹️</Text>
            <Text style={styles.buttonText}>Stop Scanning</Text>
          </TouchableOpacity>
        )}

        {description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>What I see:</Text>
            <Text style={styles.descriptionText}>{description}</Text>
            <TouchableOpacity
              style={[styles.button, styles.speakButton]}
              onPress={speakDescription}
              accessibilityLabel="Repeat description"
            >
              <Text style={styles.buttonIcon}>🔊</Text>
              <Text style={styles.buttonText}>Repeat Description</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningArea: {
    width: width * 0.8,
    height: height * 0.4,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  instructionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  controlsContainer: {
    backgroundColor: '#fff',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  scanButton: {
    backgroundColor: '#27ae60',
  },
  stopButton: {
    backgroundColor: '#e74c3c',
  },
  speakButton: {
    backgroundColor: '#3498db',
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 50,
  },
});