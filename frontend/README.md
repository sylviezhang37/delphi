# Delphi - AI Vision Assistant for the Blind

Delphi is a React Native application designed to assist blind and visually impaired users by providing AI-powered vision assistance through camera scanning and text-to-speech feedback.

## Features

- **Voice-First Interface**: All interactions are designed for audio feedback
- **AI-Powered Vision**: Uses Gemini API to analyze camera input and describe surroundings
- **Text-to-Speech**: Converts AI responses to spoken audio
- **Accessibility-Focused**: Built with screen readers and accessibility in mind
- **Two Main Modes**:
  - **Chat Mode**: Interactive conversation with the AI assistant
  - **Observation Mode**: Real-time scanning and description of surroundings

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- Android Studio (for Android development)
- Physical Android device or emulator

### Installation

1. Install dependencies:

```bash
npm install
```

2. Install additional dependencies for camera and speech:

```bash
npx expo install expo-camera expo-av expo-speech expo-permissions
```

3. Start the development server:

```bash
npm start
```

4. Run on Android:

```bash
npm run android
```

## Usage

### For Blind Users

1. **Launch the App**: The app will automatically speak a welcome message
2. **Navigate**: Use screen reader gestures to navigate between options
3. **Start Chatting**: Tap the "Start Chatting" button to begin a conversation
4. **Observe Surroundings**: Tap "Observe Surroundings" to scan your environment
5. **Repeat Messages**: Tap anywhere on the home screen to hear the welcome message again

### Accessibility Features

- **Screen Reader Support**: Full compatibility with TalkBack (Android) and VoiceOver (iOS)
- **Voice Navigation**: All interactions provide audio feedback
- **Large Touch Targets**: Buttons are designed for easy navigation
- **Audio Descriptions**: All visual elements have audio descriptions
- **Gesture Support**: Standard accessibility gestures are supported

## App Structure

```
frontend/
├── components/
│   ├── HomePage.js          # Main home screen with assistant introduction
│   ├── ChatScreen.js        # Interactive chat interface
│   ├── ObservationScreen.js # Camera scanning interface
│   └── AccessibilityHelper.js # Accessibility utilities
├── App.js                   # Main app with navigation
└── package.json            # Dependencies and scripts
```

## Key Components

### HomePage

- Welcome screen with assistant introduction
- Large, accessible buttons for navigation
- Voice feedback for all interactions
- Assistant icon in the center

### ChatScreen

- Interactive chat interface
- Text input with voice feedback
- Simulated AI responses (ready for Gemini API integration)
- Back navigation

### ObservationScreen

- Camera integration for environment scanning
- Real-time scanning with voice feedback
- Permission handling for camera access
- Description playback and repetition

## Integration with Gemini API

The app is designed to integrate with Google's Gemini API for AI-powered vision analysis. To complete the integration:

1. Add your Gemini API key to the environment variables
2. Replace the mock responses in `ChatScreen.js` and `ObservationScreen.js` with actual API calls
3. Implement proper error handling for API failures
4. Add loading states for better user experience

## Development Notes

- All text-to-speech uses Expo's Speech API
- Camera functionality uses Expo Camera
- Navigation is handled by React Navigation
- Accessibility features are built into every component
- The app is optimized for Android but can be extended for iOS

## Future Enhancements

- Real-time object detection
- Voice commands for navigation
- Offline mode capabilities
- Customizable voice settings
- Integration with other accessibility tools
- Multi-language support

## Support

For accessibility support or questions about using the app, please refer to the accessibility documentation or contact the development team.
