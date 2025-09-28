import * as Speech from 'expo-speech';

class SpeechService {
    constructor() {
        this.language = 'en';
        this.pitch = 1.0;
        this.rate = 0.8;
        this.volume = 1;
    }

    setUp() {
        this.language = 'en';
        this.pitch = 1.0;
        this.rate = 0.8;
    }

    setSpeed(speed) {
        this.rate = Math.max(0.0, Math.min(1.0, speed));
    }

    speak(text) {
        if (!text) return;

        const speechOptions = {
            language: this.language,
            pitch: this.pitch,
            rate: this.rate,
            volume: this.volume,
        };
        this.stop()
        Speech.speak(text, speechOptions);
    }

    speakWithDelay(text, delay = 0, options = {}) {
        setTimeout(() => {
            this.speak(text, options);
        }, delay);
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
