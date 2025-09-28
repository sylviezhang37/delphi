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
import speechService from '../services/SpeechService';
import { enableAccessibilityFeatures, announceScreenChange } from './AccessibilityHelper';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
    // Enable accessibility features
    enableAccessibilityFeatures();

    // Speak welcome message when component mounts
    useEffect(() => {
        announceScreenChange('Home');
        const welcomeMessage =
            "Welcome to Delphi, your AI-powered vision assistant. I'm here to help you navigate and understand your surroundings. You can take a photo to start observing your environment.";
        speechService.speak(welcomeMessage);
    }, []);

    const handleStartChat = () => {
        speechService.speak(
            'Starting chat mode. You can now ask me questions about your surroundings.'
        );
        navigation.navigate('Chat');
    };

    const handleStartObservation = () => {
        speechService.speak(
            "Starting observation mode. I'll scan your surroundings and describe what I see."
        );
        navigation.navigate('Observation');
    };

    const handleScreenTouch = () => {
        const welcomeMessage =
            "Welcome to Delphi, your AI-powered vision assistant. I'm here to help you navigate and understand your surroundings. You can start by taking a photo to begin observing your environment.";
        speechService.speak(welcomeMessage);
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleScreenTouch}
            accessibilityLabel="Tap to hear welcome message again"
            activeOpacity={1}
        >
            {/* Main Content Area */}
            <View style={styles.mainContent}>
                {/* Header with Logo */}
                <View style={styles.header}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                        accessibilityLabel="Delphi Logo"
                        resizeMode="contain"
                    />
                </View>
                {/* Welcome Message */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeTitle} accessibilityRole="header">
                        Welcome to Delphi
                    </Text>
                    <Text style={styles.welcomeSubtitle} accessibilityRole="text">
                        Your AI-powered vision assistant
                    </Text>
                </View>

                {/* Assistant Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.assistantIcon}>
                        <Image
                            source={require('../assets/hearing-icon.png')}
                            style={styles.iconImage}
                            accessibilityLabel="AI Assistant Icon"
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleStartObservation}
                        accessibilityRole="button"
                        accessibilityLabel="Start observing surroundings"
                        accessibilityHint="Double tap to begin scanning and describing your environment"
                    >
                        <Text style={styles.primaryButtonText}>Scan Environment</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText} accessibilityRole="text">
                    Tap anywhere to hear this message again
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        paddingTop: 100,
        paddingBottom: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    logo: {
        width: width * 0.4,
        height: width * 0.4 * 0.3,
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 140,
        alignItems: 'center',
    },
    welcomeSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#497a5b',
        textAlign: 'center',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 22,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    assistantIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#497a5b',
        shadowColor: '#497a5b',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    iconImage: {
        width: 60,
        height: 60,
    },
    actionsContainer: {
        gap: 15,
        width: '100%',
        maxWidth: 300,
        paddingHorizontal: 20,
        marginTop: 0,
    },
    primaryButton: {
        backgroundColor: '#497a5b',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: '#497a5b',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 2,
        borderColor: '#497a5b',
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    footer: {
        paddingHorizontal: 40,
        paddingBottom: 30,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#999999',
        textAlign: 'center',
    },
});
