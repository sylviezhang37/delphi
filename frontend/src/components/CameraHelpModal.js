import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';

export default function CameraHelpModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Camera Help</Text>
          <View style={styles.content}>
            <Text style={styles.bullet}>• Tap the "Take Photo" button to take a photo</Text>
            <Text style={styles.bullet}>• Tap the "Flash Off/On" button to toggle flash on/off</Text>
            <Text style={styles.bullet}>• Tap the "Front/Back Camera" button to flip the camera</Text>
            <Text style={styles.bullet}>• The camera will automatically focus when you tap the screen</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    marginBottom: 20,
  },
  bullet: {
    textAlign: 'left', // ensures left alignment
    marginBottom: 5,
  },
  button: {
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});