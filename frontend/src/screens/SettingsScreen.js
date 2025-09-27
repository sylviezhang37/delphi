import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Slider, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';

const SettingsScreen = ({ navigation }) => {
    const [voiceSpeed, setVoiceSpeed] = useState(0.5);
    const [hapticEnabled, setHapticEnabled] = useState(true);
    const [volume, setVolume] = useState(0.8);
    const [voiceEnabled, setVoiceEnabled] = useState(true);

    const handleHapticToggle = (value) => {
        setHapticEnabled(value);
        if (value) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    const handleVoiceSpeedChange = (value) => {
        setVoiceSpeed(value);
        if (hapticEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    const handleVolumeChange = (value) => {
        setVolume(value);
        if (hapticEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    const handleVoiceToggle = (value) => {
        setVoiceEnabled(value);
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
            Alert.alert('Voice Test', 'This is a test of the voice reading speed and volume settings.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Accessibility Settings</Text>
                <View style={styles.placeholder} />
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
                        <Text style={styles.valueText}>{Math.round(voiceSpeed * 100)}%</Text>
                    </View>

                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>Volume</Text>
                        <View style={styles.sliderContainer}>
                            <Text style={styles.sliderLabel}>Quiet</Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={0.0}
                                maximumValue={1.0}
                                value={volume}
                                onValueChange={handleVolumeChange}
                                minimumTrackTintColor="#f4b400"
                                maximumTrackTintColor="#333"
                                thumbStyle={{ backgroundColor: '#f4b400' }}
                            />
                            <Text style={styles.sliderLabel}>Loud</Text>
                        </View>
                        <Text style={styles.valueText}>{Math.round(volume * 100)}%</Text>
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

                {/* Additional Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Additional Settings</Text>

                    <TouchableOpacity style={styles.settingButton}>
                        <Text style={styles.settingButtonText}>High Contrast Mode</Text>
                        <Text style={styles.settingButtonArrow}>→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingButton}>
                        <Text style={styles.settingButtonText}>Large Text</Text>
                        <Text style={styles.settingButtonArrow}>→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingButton}>
                        <Text style={styles.settingButtonText}>Screen Reader</Text>
                        <Text style={styles.settingButtonArrow}>→</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        backgroundColor: '#000',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#f4b400',
    },
    backButton: {
        padding: 5,
    },
    backButtonText: {
        fontSize: 18,
        color: '#f4b400',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f4b400',
        flex: 1,
        textAlign: 'center',
    },
    placeholder: {
        width: 60,
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

export default SettingsScreen;
