import { EmergencyAlert, EmergencyContact } from '../types/alert';
import Voice from '@react-native-voice/voice';
import Communications from 'react-native-communications';

export class EmergencyAlertService {
  private static isRecording = false;

  static async sendEmergencyAlert(
    alert: EmergencyAlert,
    contacts: EmergencyContact[]
  ): Promise<void> {
    try {
      // Send text alerts
      await this.sendTextAlerts(alert, contacts);

      // Send voice message if available
      if (alert.voiceMessage) {
        await this.sendVoiceAlerts(alert, contacts);
      }

      // Update alert status
      alert.status = 'sent';
    } catch (error) {
      alert.status = 'failed';
      throw error;
    }
  }

  private static async sendTextAlerts(
    alert: EmergencyAlert,
    contacts: EmergencyContact[]
  ): Promise<void> {
    const message = this.formatAlertMessage(alert);

    for (const contact of contacts) {
      try {
        await Communications.text(contact.phone, message);
      } catch (error) {
        console.error(`Failed to send text to ${contact.name}:`, error);
      }
    }
  }

  private static async sendVoiceAlerts(
    alert: EmergencyAlert,
    contacts: EmergencyContact[]
  ): Promise<void> {
    for (const contact of contacts) {
      try {
        await Communications.phonecall(contact.phone, true);
      } catch (error) {
        console.error(`Failed to initiate call to ${contact.name}:`, error);
      }
    }
  }

  private static formatAlertMessage(alert: EmergencyAlert): string {
    return `URGENT HEALTH ALERT\n\n` +
           `Severity: ${alert.severity.toUpperCase()}\n` +
           `Heart Rate: ${alert.heartRate} BPM\n` +
           `Time: ${new Date(alert.timestamp).toLocaleString()}\n\n` +
           `${alert.message}`;
  }

  static async startVoiceRecording(): Promise<void> {
    if (this.isRecording) return;

    try {
      await Voice.start('en-US');
      this.isRecording = true;
    } catch (error) {
      console.error('Error starting voice recording:', error);
      throw error;
    }
  }

  static async stopVoiceRecording(): Promise<string> {
    if (!this.isRecording) return '';

    try {
      const result = await Voice.stop();
      this.isRecording = false;
      return result.toString();
    } catch (error) {
      console.error('Error stopping voice recording:', error);
      throw error;
    }
  }
}