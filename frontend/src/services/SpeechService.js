import * as Speech from 'expo-speech';

class SpeechService {
    constructor() {
        this.language = 'en';
        this.pitch = 1.0;
        this.rate = 0.8;
        this.volume = 1;
        this.enabled = true;
        this.cameraMessageAnnounced = false;
    }

    setUp() {
        this.language = 'en';
        this.pitch = 1.0;
        this.rate = 0.8;
    }

    setSpeed(speed) {
        this.rate = Math.max(0.0, Math.min(1.0, speed));
    }

    setEnabled(enabled) {
        if (!enabled) {
            this.stop();
        }
        this.enabled = enabled;
    }

    setCameraMessageAnnounced() {
        this.cameraMessageAnnounced = true;
    }

    speak(text) {
        if (!text || !this.enabled) return;

        const speechOptions = {
            language: this.language,
            pitch: this.pitch,
            rate: this.rate,
            volume: this.volume,
        };
        this.stop();
        Speech.speak(text, speechOptions);
    }

    stop() {
        Speech.stop();
    }

    isSpeaking() {
        return Speech.isSpeakingAsync();
    }
}

const speechService = new SpeechService();

export default speechService;
