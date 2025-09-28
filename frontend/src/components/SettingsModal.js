import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
    Modal,
    Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import speechService from '../services/SpeechService';

const { height } = Dimensions.get('window');

const SettingsModal = ({ visible, onClose }) => {
    const [voiceSpeed, setVoiceSpeed] = useState(0.5);
    const [hapticEnabled, setHapticEnabled] = useState(true);
    const [voiceEnabled, setVoiceEnabled] = useState(true);

    const handleHapticToggle = (value) => {
        setHapticEnabled(value);
        if (value) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    const handleVoiceSpeedChange = (value) => {
        setVoiceSpeed(value);
        speechService.setSpeed(value);
        if (hapticEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    const handleVoiceToggle = (value) => {
        setVoiceEnabled(value);
        speechService.setEnabled(value);
        if (hapticEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    const testHaptic = () => {
        if (hapticEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
    };

    const testVoice = () => {
        if (voiceEnabled) {
            speechService.speak('Testing voice settings', {
                rate: voiceSpeed,
            });
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Accessibility Settings</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content}>
                        {/* Voice Settings */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Voice Settings</Text>

                            <View style={styles.settingRow}>
                                <Text style={styles.settingLabel}>Enable Voice Reading</Text>
                                <Switch
                                    value={voiceEnabled}
                                    onValueChange={handleVoiceToggle}
                                    trackColor={{ false: '#767577', true: '#f4b400' }}
                                    thumbColor={voiceEnabled ? '#000' : '#f4f4f4'}
                                />
                            </View>

                            <View style={styles.settingRow}>
                                <Text style={styles.settingLabel}>Voice Speed</Text>
                                <View style={styles.sliderContainer}>
                                    <Text style={styles.sliderLabel}>Slow</Text>
                                    <Slider
                                        style={styles.slider}
                                        minimumValue={0.1}
                                        maximumValue={1.0}
                                        value={voiceSpeed}
                                        onValueChange={handleVoiceSpeedChange}
                                        minimumTrackTintColor="#f4b400"
                                        maximumTrackTintColor="#333"
                                        thumbStyle={{ backgroundColor: '#f4b400' }}
                                    />
                                    <Text style={styles.sliderLabel}>Fast</Text>
                                </View>
                                <Text style={styles.valueText}>
                                    {Math.round(voiceSpeed * 100)}%
                                </Text>
                            </View>

                            <TouchableOpacity style={styles.testButton} onPress={testVoice}>
                                <Text style={styles.testButtonText}>Test Voice Settings</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Haptic Settings */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Haptic Feedback</Text>

                            <View style={styles.settingRow}>
                                <Text style={styles.settingLabel}>Enable Haptic Feedback</Text>
                                <Switch
                                    value={hapticEnabled}
                                    onValueChange={handleHapticToggle}
                                    trackColor={{ false: '#767577', true: '#f4b400' }}
                                    thumbColor={hapticEnabled ? '#000' : '#f4f4f4'}
                                />
                            </View>

                            <TouchableOpacity style={styles.testButton} onPress={testHaptic}>
                                <Text style={styles.testButtonText}>Test Haptic Feedback</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#1a1a1a',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: height * 0.8,
        minHeight: height * 0.6,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#f4b400',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f4b400',
        flex: 1,
        textAlign: 'center',
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f4b400',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f4b400',
        marginBottom: 15,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingVertical: 10,
    },
    settingLabel: {
        fontSize: 16,
        color: '#fff',
        flex: 1,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
        marginHorizontal: 10,
    },
    slider: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
    },
    sliderLabel: {
        fontSize: 12,
        color: '#666',
        minWidth: 40,
        textAlign: 'center',
    },
    valueText: {
        fontSize: 14,
        color: '#f4b400',
        fontWeight: 'bold',
        minWidth: 40,
        textAlign: 'right',
    },
    testButton: {
        backgroundColor: '#f4b400',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    testButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    settingButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    settingButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    settingButtonArrow: {
        fontSize: 18,
        color: '#f4b400',
    },
});

export default SettingsModal;
