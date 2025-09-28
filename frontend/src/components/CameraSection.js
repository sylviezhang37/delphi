import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Haptics from 'expo-haptics';

const CameraSection = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back'); // just a string now
  const [flash, setFlash] = useState('off');   // just a string now
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <Text style={styles.cameraPlaceholder}>Requesting camera permission...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.cameraContainer}>
        <Text style={styles.cameraPlaceholder}>Camera permission is required</Text>
        <TouchableOpacity style={styles.controlButton} onPress={requestPermission}>
          <Text style={styles.controlText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleFlash = () => {
    setFlash((current) => (current === 'off' ? 'on' : 'off'));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true
      });
      
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Photo Captured!', 'Photo saved to your photo gallery!');
        navigation.navigate('Chat', { photoBase64: photo.base64 }); 
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', `Failed to take picture: ${error.message}`);
    }
  };

  return (
    <View style={styles.cameraContainer}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash={flash}
      />

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
          <Text style={styles.controlText}>{flash === 'on' ? 'Flash On' : 'Flash Off'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cameraButton, styles.controlButton]} onPress={takePicture}>
          <Text style={styles.controlText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
          <Text style={styles.controlText}>
            {facing === 'back' ? 'Front Camera' : 'Back Camera'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: { flex: 1, backgroundColor: '#000', paddingBottom: 20},
  camera: { flex: 1, 
    margin: 10, 
    borderRadius: 10, 
    overflow: 'hidden', 
    borderColor: '#f4b400', // yellow border
    borderWidth: 3,           // thickness of border
 },
  cameraPlaceholder: {
    color: '#f4b400',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#000',
  },
  controlButton: {
    borderWidth: 2,
    borderColor: '#f4b400',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cameraButton: {  borderWidth: 0 },
  controlText: { color: '#f4b400', fontWeight: 'bold' },
});

export default CameraSection;
