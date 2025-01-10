import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

interface EmergencyAlertButtonProps {
  onPress: () => void;
  isRecording: boolean;
}

export const EmergencyAlertButton: React.FC<EmergencyAlertButtonProps> = ({
  onPress,
  isRecording
}) => (
  <TouchableOpacity
    style={[styles.button, isRecording && styles.recording]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>
      {isRecording ? 'Recording Voice Message...' : 'Record Emergency Message'}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF4444',
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
  },
  recording: {
    backgroundColor: '#880000',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});