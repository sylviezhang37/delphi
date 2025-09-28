import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import mcp from "../services/MCPService"
import * as Speech from 'expo-speech';

export default function ChatScreen({ route, navigation }) {
  const { photoBase64 } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [detailString, setDetailString] = useState('');

  useEffect(() => {
    if (!photoBase64) return;
  
    const sendToMCP = async () => {
      try {
        await mcp.connect();
        const response = await mcp.processSingleImage(photoBase64);
  
        const key = Object.keys(response.results)[0];
        const nestedString = response.results[key].trim();
        const { overview, details } = JSON.parse(nestedString);
        setDetailString(details)
  
        await mcp.disconnect();
  
        // Add AI message with overview
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: `Here is an overview of the image you took: ${overview}\nDo you need more context?`,
            isUser: false,
            type: 'options',
            options: ['Yes', 'No'],
            overview,
            details,
          }
        ]);
  
        // Speak the AI message
        Speech.speak(`Here is an overview of the image you took: ${overview}. Do you need more context?`, { language: 'en', pitch: 1.0, rate: 0.8 });
  
      } catch (err) {
        console.error("MCP test failed:", err);
      }
    };
  
    sendToMCP();
  }, [photoBase64]);
  

  const handleOptionPress = (option, details) => {
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        text: option,
        isUser: true,
      }
    ]);
  
    let aiResponseText = '';
    if (option === 'Yes') {
      aiResponseText = `Here are more details on the image: ${details}`;
    } else {
      aiResponseText = `Great, you can continue taking another photo if you want!`;
    }
  
    const aiMessage = {
      id: messages.length + 2,
      text: aiResponseText,
      isUser: false,
    };
  
    setMessages(prev => [...prev, aiMessage]);
  
    // Speak AI response
    Speech.speak(aiMessage.text, { language: 'en', pitch: 1.0, rate: 0.8 });
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages(prev => [
        ...messages,
        {
          id: messages.length + 1,
          text: inputText,
          isUser: true,
        }
      ]);
      setInputText('');

      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: "I understand you're asking about: " + inputText + ". I'm here to help describe your surroundings or answer questions about what you can't see.",
          isUser: false,
        };
        setMessages(prev => [...prev, aiResponse]);
        
        // Speak the AI response
        Speech.speak(aiResponse.text, {
          language: 'en',
          pitch: 1.0,
          rate: 0.8,
        });
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back to home"
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header2}>
          <Text style={styles.headerTitle}>Delphi </Text>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.isUser ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.aiMessageText,
              ]}
            >
              {message.text}
            </Text>

            {/* Render buttons if message has options */}
            {!message.isUser && message.type === 'options' && (
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                {message.options.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={{
                      backgroundColor: '#497a5b',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      marginRight: 10,
                      borderRadius: 10,
                    }}
                    onPress={() => handleOptionPress(option, detailString)}
                  >
                    <Text style={{ color: '#fff' }}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#95a5a6"
          multiline
          accessibilityLabel="Message input"
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          accessibilityLabel="Send message"
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cameraButtonContainer}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => {
            Speech.speak("Opening camera to scan your surroundings.", {
              language: 'en',
              pitch: 1.0,
              rate: 0.8,
            });
            navigation.navigate('Observation');
          }}
          accessibilityLabel="Open camera to scan surroundings"
        >
          <Text style={styles.cameraButtonText}>📷 Scan Environment</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 50,
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
    color: '#497a5b',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#497a5b',
  },
  header2: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: '#497a5b',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#ecf0f1',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#497a5b',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#497a5b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f4b400',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cameraButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
  cameraButton: {
    backgroundColor: '#497a5b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f4b400',
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});