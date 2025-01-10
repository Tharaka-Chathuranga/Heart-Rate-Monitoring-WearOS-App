import React, { useState } from 'react';
import {Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { HealthMessages } from '../screens/HealthMessages';
import { Message } from '../types/message';

export const MessageDisplayScreen: React.FC = () => {
  const [testMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Warning: Heart rate elevated above normal range',
      sender: 'Dr. Smith',
      timestamp: Date.now() - 300000, // 5 minutes ago
      type: 'alert',
      relatedHeartRate: 120
    },
    {
      id: '2',
      text: 'Please take your medication as prescribed',
      sender: 'Nurse Johnson',
      timestamp: Date.now() - 600000, // 10 minutes ago
      type: 'recommendation',
      relatedHeartRate: 95
    },
    {
      id: '3',
      text: 'Your heart rate has stabilized',
      sender: 'Health Monitor',
      timestamp: Date.now() - 900000, // 15 minutes ago
      type: 'info',
      relatedHeartRate: 75
    },
    {
      id: '4',
      text: 'Time for your evening walk',
      sender: 'Health Coach',
      timestamp: Date.now() - 1800000, // 30 minutes ago
      type: 'recommendation',
      relatedHeartRate: 82
    },
    {
      id: '5',
      text: 'Emergency contact has been notified',
      sender: 'System Alert',
      timestamp: Date.now() - 3600000, // 1 hour ago
      type: 'alert',
      relatedHeartRate: 135
    }
  ]);

  // Simulated current heart rate
  const [currentHeartRate] = useState<number>(82);

  const handleMessagePress = (message: Message) => {
    console.log('Message pressed:', message);
  };
  const screenHeight = Dimensions.get('window').height;
  const statsContainerHeight = screenHeight * 0.35;
  return (
    <View style={styles.container}>
      <View style={styles.header, { height: statsContainerHeight }}>
        <Text style={styles.title}>Health Messages</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>Messages: {testMessages.length}</Text>
          <Text style={styles.statText}>Alerts: {testMessages.filter(m => m.type === 'alert').length}</Text>
        </View>
      </View>

      <HealthMessages
        messages={testMessages}
//         currentHeartRate={currentHeartRate}
        onMessagePress={handleMessagePress}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Refresh pressed')}
        >
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 4,
  },
  statText: {
    color: '#888888',
    fontSize: 12,
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  }
});
