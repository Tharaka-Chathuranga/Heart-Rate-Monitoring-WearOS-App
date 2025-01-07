import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Message } from '../types/message';

interface HealthMessagesProps {
  messages: Message[];
  currentHeartRate: number | null;
  onMessagePress?: (message: Message) => void;
}

export const HealthMessages: React.FC<HealthMessagesProps> = ({
  messages,
  currentHeartRate,
  onMessagePress
}) => {
  const renderMessage = (message: Message) => {
    const messageTime = new Date(message.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <TouchableOpacity
        key={message.id}
        style={[styles.messageContainer, styles[`${message.type}Message`]]}
        onPress={() => onMessagePress?.(message)}
      >
        <View style={styles.messageHeader}>
          <Text style={styles.sender}>{message.sender}</Text>
          <Text style={styles.timestamp}>{messageTime}</Text>
        </View>
        <Text style={styles.messageText}>{message.text}</Text>
        {message.relatedHeartRate && (
          <Text style={styles.heartRateReference}>
            HR: {message.relatedHeartRate} BPM
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {currentHeartRate && (
        <View style={styles.currentStats}>
          <Text style={styles.currentHeartRate}>
            Current HR: {currentHeartRate} BPM
          </Text>
        </View>
      )}
      <ScrollView style={styles.scrollView}>
        {messages.map(renderMessage)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
    padding: 8,
  },
  currentStats: {
    padding: 8,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  currentHeartRate: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageContainer: {
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sender: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#888888',
    fontSize: 10,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  heartRateReference: {
    color: '#888888',
    fontSize: 10,
    marginTop: 4,
  },
  alertMessage: {
    borderLeftWidth: 3,
    borderLeftColor: '#FF4444',
  },
  recommendationMessage: {
    borderLeftWidth: 3,
    borderLeftColor: '#44FF44',
  },
  infoMessage: {
    borderLeftWidth: 3,
    borderLeftColor: '#4444FF',
  },
});