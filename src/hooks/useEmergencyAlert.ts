import { useState, useEffect } from 'react';
import { EmergencyAlert, EmergencyContact } from '../types/alert';
import { EmergencyAlertService } from '../services/EmergencyAlertService';

export const useEmergencyAlert = (
  criticalHeartRateThreshold: number,
  contacts: EmergencyContact[]
) => {
  const [currentAlert, setCurrentAlert] = useState<EmergencyAlert | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const checkHeartRate = (heartRate: number) => {
    if (heartRate > criticalHeartRateThreshold && !currentAlert) {
      const newAlert: EmergencyAlert = {
        id: Date.now().toString(),
        heartRate,
        timestamp: Date.now(),
        severity: 'critical',
        message: `Critical heart rate detected: ${heartRate} BPM`,
        status: 'pending'
      };
      setCurrentAlert(newAlert);
    }
  };

  const sendAlert = async (alert: EmergencyAlert) => {
    try {
      await EmergencyAlertService.sendEmergencyAlert(alert, contacts);
      setCurrentAlert(null);
    } catch (error) {
      console.error('Failed to send emergency alert:', error);
    }
  };

  const startVoiceMessage = async () => {
    try {
      await EmergencyAlertService.startVoiceRecording();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start voice recording:', error);
    }
  };

  const stopVoiceMessage = async () => {
    try {
      const voiceMessage = await EmergencyAlertService.stopVoiceRecording();
      setIsRecording(false);
      if (currentAlert && voiceMessage) {
        setCurrentAlert({
          ...currentAlert,
          voiceMessage
        });
      }
    } catch (error) {
      console.error('Failed to stop voice recording:', error);
    }
  };

  return {
    currentAlert,
    isRecording,
    checkHeartRate,
    sendAlert,
    startVoiceMessage,
    stopVoiceMessage
  };
};