// src/screens/EmergencyAlertScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { useEmergencyAlert } from '../hooks/useEmergencyAlert';
import { EmergencyContact } from '../types/alert';

interface EmergencyAlertScreenProps {
  contacts: EmergencyContact[];
}

const EmergencyAlertScreen: React.FC<EmergencyAlertScreenProps> = ({ contacts }) => {
  const [heartRate, setHeartRate] = useState('');
  const {
    currentAlert,
    isRecording,
    checkHeartRate,
    sendAlert,
    startVoiceMessage,
    stopVoiceMessage
  } = useEmergencyAlert(100, contacts); // Replace 100 with your critical heart rate threshold

  const handleSendAlert = () => {
    if (currentAlert) {
      sendAlert(currentAlert);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Alert System</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Heart Rate"
        keyboardType="numeric"
        value={heartRate}
        onChangeText={setHeartRate}
      />
      <Button title="Check Heart Rate" onPress={() => checkHeartRate(Number(heartRate))} />

      {currentAlert && (
        <>
          <Text style={styles.alertMessage}>{currentAlert.message}</Text>
          <Button title="Send Alert" onPress={handleSendAlert} />
        </>
      )}

      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopVoiceMessage : startVoiceMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  alertMessage: {
    fontSize: 18,
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default EmergencyAlertScreen;