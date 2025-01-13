import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

export const MonitorButton = ({ onPress, isMonitoring }) => (
  <TouchableOpacity
    style={[styles.button, isMonitoring && styles.buttonMonitoring]}
    onPress={onPress}
    disabled={isMonitoring}
  >
    <Text style={styles.buttonText}>
      {isMonitoring ? 'Monitoring...' : 'Start'}
    </Text>
  </TouchableOpacity>
);

const { width } = Dimensions.get('window');
const buttonFontSize = Math.round(width * 0.045); // 4.5% of screen width

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333333',
    padding: '3%',
    borderRadius: 20,
    width: '35%',
    alignItems: 'center',
  },
  buttonMonitoring: {
    backgroundColor: '#444444',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: buttonFontSize,
    fontWeight: '500',
  },
});